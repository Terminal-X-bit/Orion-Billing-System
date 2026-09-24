// Orion captive portal client logic (no dependencies).
//
// Talks to the bridge's public endpoints with relative URLs so the page works
// whatever IP the router assigns:
//   GET  /packages               -> { packages: [...] }
//   POST /pay                    -> { checkoutRequestId, statusUrl, message }
//   GET  /pay/:checkoutRequestId -> { status, packageName, amount, voucherCode, ... }
//
// Voucher login POSTs username/password to the MikroTik hotspot login handler:
//   - preferred action comes from ?linkloginonly= (the router's own
//     http://<hotspot-ip>/login URL, passed through by the redirector page)
//   - fallback is same-origin "login"
//   - ?dst= is forwarded so MikroTik can land the guest on their target site
//
// When /packages fails (e.g. the page is opened outside the hotspot for a
// demo), the portal falls back to DEMO_PACKAGES and simulates payments and
// voucher logins so the whole flow can be demoed without a router or Daraja.

(function () {
  'use strict'

  // --------------------------------------------------------------------------
  // Theme toggle (same behavior and storage key as the dashboard)
  // --------------------------------------------------------------------------

  var themeToggle = document.getElementById('themeToggle')
  var themeMeta = document.querySelector('meta[name="theme-color"]')
  var THEME_COLORS = { light: '#f4f6f1', dark: '#0e1412' }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[theme])
    themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode'
    try { localStorage.setItem('orion_theme', theme) } catch (e) { /* private mode */ }
  }

  themeToggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme')
    applyTheme(current === 'dark' ? 'light' : 'dark')
  })

  // --------------------------------------------------------------------------
  // Fallback demo data (mirrors the dashboard's seeded packages)
  // --------------------------------------------------------------------------

  var DEMO_PACKAGES = [
    { id: 'demo-1', name: '1 Hour Unlimited Rush', duration: '1 Hour', price_amount: 70, speed_limit: '10 Mbps', device_limit: 1 },
    { id: 'demo-2', name: '24h Day Pass Unlimited', duration: '24 Hours', price_amount: 350, speed_limit: '20 Mbps', device_limit: 1 },
    { id: 'demo-3', name: '7 Days Unlimited Flex', duration: '7 Days', price_amount: 1500, speed_limit: '25 Mbps', device_limit: 1 },
    { id: 'demo-4', name: '30 Days Monthly Unlimited Pro', duration: '30 Days', price_amount: 3500, speed_limit: '30 Mbps', device_limit: 1 },
  ]

  // --------------------------------------------------------------------------
  // Tiny helpers
  // --------------------------------------------------------------------------

  function $(id) { return document.getElementById(id) }

  var els = {
    tabVoucher: $('tabVoucher'),
    tabBuy: $('tabBuy'),
    tabAccount: $('tabAccount'),
    accountForm: $('accountForm'),
    accountPhone: $('accountPhone'),
    accountBtn: $('accountBtn'),
    accountView: $('accountView'),
    accountCurrent: $('accountCurrent'),
    accountHistory: $('accountHistory'),
    voucherForm: $('voucherForm'),
    code: $('code'),
    voucherBtn: $('voucherBtn'),
    buyForm: $('buyForm'),
    packagesList: $('packagesList'),
    phone: $('phone'),
    buyBtn: $('buyBtn'),
    errorBox: $('errorBox'),
    errorMsg: $('errorMsg'),
    brandName: $('brandName'),
    authTitle: $('authTitle'),
    authSub: $('authSub'),
    footerNote: $('footerNote'),
    viewAuth: $('view-auth'),
    viewWaiting: $('view-waiting'),
    viewSuccess: $('view-success'),
    waitingAmount: $('waitingAmount'),
    waitingPkg: $('waitingPkg'),
    waitingSub: $('waitingSub'),
    cancelWaitBtn: $('cancelWaitBtn'),
    voucherCode: $('voucherCode'),
    voucherMeta: $('voucherMeta'),
    receiptLine: $('receiptLine'),
    startBtn: $('startBtn'),
    copyCodeBtn: $('copyCodeBtn'),
  }

  var state = {
    packages: [],
    selectedPackageId: null,
    liveMode: true,
    demoPaidAt: null,
    pollTimer: null,
  }

  function showError(message) {
    els.errorMsg.textContent = message
    els.errorBox.classList.remove('hidden')
  }

  function clearError() {
    els.errorBox.classList.add('hidden')
    els.errorMsg.textContent = ''
  }

  function showView(name) {
    els.viewAuth.classList.toggle('hidden', name !== 'auth')
    els.viewWaiting.classList.toggle('hidden', name !== 'waiting')
    els.viewSuccess.classList.toggle('hidden', name !== 'success')
    if (name === 'auth') window.scrollTo(0, 0)
  }

  function setMode(mode) {
    var voucher = mode === 'voucher'
    var account = mode === 'account'
    els.tabVoucher.classList.toggle('active', voucher)
    els.tabBuy.classList.toggle('active', mode === 'buy')
    els.tabAccount.classList.toggle('active', account)
    els.voucherForm.classList.toggle('hidden', !voucher)
    els.buyForm.classList.toggle('hidden', mode !== 'buy')
    els.accountForm.classList.toggle('hidden', !account)
    if (!account) els.accountView.classList.add('hidden')
    clearError()
  }

  function ksh(amount) {
    var n = Number(amount)
    return 'KSh ' + (isFinite(n) ? n.toLocaleString() : String(amount))
  }

  // --------------------------------------------------------------------------
  // Operator branding (window.ORION_BRANDING injected by the bridge from
  // Settings -> Captive Portal Branding). Everything has a safe fallback.
  // --------------------------------------------------------------------------

  function applyBranding() {
    var b = window.ORION_BRANDING || {}

    // Business name: keep the trailing coral dot on the last word.
    if (typeof b.businessName === 'string' && b.businessName.trim()) {
      var words = b.businessName.trim().split(/\s+/)
      var last = words.pop()
      els.brandName.innerHTML = ''
      if (words.length > 0) {
        els.brandName.appendChild(document.createTextNode(words.join(' ') + ' '))
      }
      var accentWord = document.createElement('span')
      accentWord.textContent = last
      var dot = document.createElement('span')
      dot.className = 'brand-dot'
      dot.textContent = '.'
      accentWord.appendChild(dot)
      els.brandName.appendChild(accentWord)
    }

    // Headline + subtitle come from the portal tab; fall back to the
    // static HTML defaults when branding is absent.
    if (b.portalTitle) els.authTitle.textContent = b.portalTitle
    if (b.portalMessage) els.authSub.textContent = b.portalMessage

    // Footer: custom note when set, otherwise name / payment / support line.
    if (typeof b.footerNote === 'string' && b.footerNote.trim()) {
      els.footerNote.textContent = b.footerNote.trim()
    } else {
      var footerParts = []
      if (b.businessName) footerParts.push(b.businessName + ' Guest Wi-Fi')
      footerParts.push('Pay via M-Pesa')
      footerParts.push('Support: ' + (b.supportPhone || '0700 000 000'))
      els.footerNote.textContent = footerParts.join(' · ')
    }

    // Browser tab title follows the business name.
    var titleTag = document.getElementById('portalTitleTag')
    if (titleTag && b.businessName) {
      titleTag.textContent = b.businessName + ' Wi-Fi — Sign in'
      document.title = titleTag.textContent
    }
  }

  applyBranding()

  function pkgPrice(pkg) { return Number(pkg.price_amount) || 0 }

  function pkgSpecLine(pkg) {
    return [
      pkg.duration,
      pkg.speed_limit,
      (pkg.device_limit || 1) + (pkg.device_limit === 1 ? ' device' : ' devices'),
    ].filter(Boolean).join(' · ')
  }

  function selectedPkg() {
    for (var i = 0; i < state.packages.length; i++) {
      if (state.packages[i].id === state.selectedPackageId) return state.packages[i]
    }
    return null
  }

  function demoVoucherCode() {
    var alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
    function group() {
      var out = ''
      for (var i = 0; i < 4; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)]
      return out
    }
    return 'ORN-' + group() + '-' + group()
  }

  function setReceiptLine(text) {
    var p = els.receiptLine.querySelector('p')
    if (p) p.textContent = text
  }

  // --------------------------------------------------------------------------
  // Packages (live with demo fallback)
  // --------------------------------------------------------------------------

  function renderPackages() {
    els.packagesList.innerHTML = ''
    if (!state.packages.length) {
      var p = document.createElement('p')
      p.className = 'tiny'
      p.textContent = 'No packages are available right now. Please try again later.'
      els.packagesList.appendChild(p)
      return
    }
    state.packages.forEach(function (pkg) {
      var card = document.createElement('button')
      card.type = 'button'
      card.className = 'package-card' + (state.selectedPackageId === pkg.id ? ' selected' : '')

      var copy = document.createElement('div')
      copy.className = 'package-copy'
      var title = document.createElement('strong')
      title.textContent = pkg.name
      var spec = document.createElement('span')
      spec.textContent = pkgSpecLine(pkg)
      copy.appendChild(title)
      copy.appendChild(spec)

      var price = document.createElement('div')
      price.className = 'package-price'
      var priceStrong = document.createElement('strong')
      priceStrong.textContent = ksh(pkgPrice(pkg))
      var per = document.createElement('span')
      per.textContent = pkg.duration || ''
      price.appendChild(priceStrong)
      price.appendChild(per)

      card.appendChild(copy)
      card.appendChild(price)
      card.addEventListener('click', function () {
        state.selectedPackageId = pkg.id
        clearError()
        renderPackages()
      })
      els.packagesList.appendChild(card)
    })
  }

  function selectDefaultPackage() {
    if (!state.selectedPackageId && state.packages.length) {
      state.selectedPackageId = state.packages[0].id
    }
  }

  fetch('/packages', { headers: { Accept: 'application/json' } })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status)
      return res.json()
    })
    .then(function (data) {
      var packages = (data && data.packages) || []
      if (!packages.length) throw new Error('no packages')
      state.packages = packages
      state.liveMode = true
      selectDefaultPackage()
      renderPackages()
    })
    .catch(function () {
      state.packages = DEMO_PACKAGES
      state.liveMode = false
      state.selectedPackageId = null
      selectDefaultPackage()
      renderPackages()
    })

  // --------------------------------------------------------------------------
  // Voucher login (RouterOS redirect-style flow, simulated in demo mode)
  // --------------------------------------------------------------------------

  els.voucherForm.addEventListener('submit', function (event) {
    event.preventDefault()
    var code = (els.code.value || '').trim()
    if (!code) {
      showError('Enter your voucher code to connect.')
      return
    }
    if (!state.liveMode) {
      els.voucherCode.textContent = code.toUpperCase()
      els.voucherMeta.textContent = 'Demo voucher login'
      setReceiptLine('Demo mode — connect a live hotspot to authenticate this code.')
      showView('success')
      return
    }
    var params = new URLSearchParams(window.location.search)
    var form = document.createElement('form')
    form.method = 'POST'
    form.action = params.get('linkloginonly') || 'login'
    function addField(name, value) {
      var input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      form.appendChild(input)
    }
    addField('username', code)
    addField('password', code)
    var dst = params.get('dst') || params.get('redirect')
    if (dst) addField('dst', dst)
    addField('popup', 'true')
    els.voucherBtn.disabled = true
    document.body.appendChild(form)
    form.submit()
  })

  // --------------------------------------------------------------------------
  // Buy with M-Pesa (live) / simulated (demo)
  // --------------------------------------------------------------------------

  function startPolling(checkoutRequestId, price, pkg, phone) {
    showView('waiting')
    els.waitingAmount.textContent = ksh(price)
    els.waitingPkg.textContent = pkg.name
    els.waitingSub.textContent = phone
      ? "We've sent a payment prompt to " + phone + ". Enter your M-Pesa PIN to confirm."
      : "We've sent a payment prompt to your phone. Enter your M-Pesa PIN to confirm."
    state.pollTimer = setInterval(function () {
      pollOnce(checkoutRequestId)
    }, 2000)
  }

  function stopPolling() {
    clearInterval(state.pollTimer)
    state.pollTimer = null
  }

  function pollOnce(checkoutRequestId) {
    if (!state.liveMode) {
      if (state.demoPaidAt && Date.now() >= state.demoPaidAt) {
        stopPolling()
        var pkg = selectedPkg()
        finishPayment({
          status: 'paid',
          packageName: pkg ? pkg.name : '',
          amount: pkg ? pkgPrice(pkg) : 0,
          voucherCode: demoVoucherCode(),
          mpesaReceipt: 'DEMO' + Math.random().toString(36).slice(2, 10).toUpperCase(),
        })
      }
      return
    }
    fetch('/pay/' + encodeURIComponent(checkoutRequestId), { headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then(function (data) {
        if (data.status === 'paid' || data.status === 'failed' || data.status === 'cancelled') {
          stopPolling()
          if (data.status === 'paid') {
            finishPayment(data)
          } else {
            showView('auth')
            showError(
              data.status === 'cancelled'
                ? 'Payment request expired. Please try again.'
                : 'Payment did not go through' + (data.resultDesc ? ' — ' + data.resultDesc : '') + '.'
            )
          }
        }
      })
      .catch(function (err) {
        console.warn('[portal] poll failed:', err && err.message)
      })
  }

  function finishPayment(data) {
    showView('success')
    els.voucherCode.textContent = data.voucherCode || '—'
    var pkg = selectedPkg()
    els.voucherMeta.textContent = pkg ? pkg.name + ' · ' + pkgSpecLine(pkg) : (data.packageName || '')
    setReceiptLine(
      data.mpesaReceipt
        ? 'M-Pesa receipt: ' + data.mpesaReceipt
        : 'Payment confirmed. Connect with the code above.'
    )
  }

  els.buyForm.addEventListener('submit', function (event) {
    event.preventDefault()
    clearError()
    var pkg = selectedPkg()
    if (!pkg) {
      showError('Choose a package first.')
      return
    }
    var phone = (els.phone.value || '').replace(/[\s-]/g, '')
    if (!/^(?:\+?254|0)?(?:7\d{8}|1\d{8})$/.test(phone)) {
      showError('Enter a valid Safaricom number, e.g. 0712 345 678.')
      return
    }
    if (!state.liveMode) {
      state.demoPaidAt = Date.now() + 6000
      startPolling('demo-checkout-id', pkgPrice(pkg), pkg, phone)
      return
    }
    els.buyBtn.disabled = true
    fetch('/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ phone: phone, packageId: pkg.id }),
    })
      .then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok, status: res.status, data: data } })
      })
      .then(function (r) {
        if (r.status === 503) {
          showError(r.data.error || 'M-Pesa payments are not configured on this hotspot. Please use a voucher.')
          return
        }
        if (r.status === 429) {
          showError('Too many attempts — please wait a minute and try again.')
          return
        }
        if (!r.ok || !r.data.checkoutRequestId) {
          showError(r.data.error || 'Could not start the payment. Please try again.')
          return
        }
        startPolling(r.data.checkoutRequestId, pkgPrice(pkg), pkg, phone)
      })
      .catch(function () {
        showError('Network error — could not reach the payment service.')
      })
      .then(function () {
        els.buyBtn.disabled = false
      })
  })

  els.cancelWaitBtn.addEventListener('click', function () {
    stopPolling()
    state.demoPaidAt = null
    showView('auth')
  })

  els.copyCodeBtn.addEventListener('click', function () {
    var code = els.voucherCode.textContent
    function done() {
      els.copyCodeBtn.textContent = 'Copied!'
      setTimeout(function () { els.copyCodeBtn.textContent = 'Copy code' }, 1600)
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(done, function () { /* ignore */ })
    }
  })

  els.startBtn.addEventListener('click', function () {
    var params = new URLSearchParams(window.location.search)
    var dst = params.get('dst') || params.get('redirect')
    window.location.href = dst || 'http://1.1.1.1'
  })

  // --------------------------------------------------------------------------
  // Tabs + ?code= prefill (desk-printed receipts can link straight to the code)
  // --------------------------------------------------------------------------

  els.tabVoucher.addEventListener('click', function () { setMode('voucher') })
  els.tabBuy.addEventListener('click', function () { setMode('buy') })
  els.tabAccount.addEventListener('click', function () { setMode('account') })

  // --------------------------------------------------------------------------
  // Account lookup (GET /account/:phone)
  // --------------------------------------------------------------------------

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    })
  }

  function renderAccount(data) {
    var cur = data.current
    if (cur) {
      els.accountCurrent.innerHTML =
        '<div class="account-row"><span>Plan</span><strong>' + escapeHtml(cur.packageName) + '</strong></div>' +
        '<div class="account-row"><span>Status</span><strong>' +
        (cur.expired ? 'Expired' : 'Active') + '</strong></div>' +
        '<div class="account-row"><span>' + (cur.expired ? 'Expired' : 'Time remaining') + '</span><strong>' +
        escapeHtml(cur.remainingLabel) + '</strong></div>' +
        '<div class="account-row"><span>Data allowance</span><strong>' + escapeHtml(cur.dataLimit) + '</strong></div>' +
        '<div class="account-row"><span>Speed</span><strong>' + escapeHtml(cur.speedLimit) + '</strong></div>' +
        '<div class="account-row"><span>Devices</span><strong>' + escapeHtml(String(cur.devices)) + '</strong></div>' +
        '<div class="account-row"><span>Voucher</span><strong>' + escapeHtml(cur.voucherCode) + '</strong></div>'
    } else {
      els.accountCurrent.innerHTML =
        '<p class="tiny">No active plan found for this number. Buy one from the "Buy with M-Pesa" tab.</p>'
    }
    if (!data.purchases || !data.purchases.length) {
      els.accountHistory.innerHTML = '<p class="tiny">No purchases yet.</p>'
      return
    }
    els.accountHistory.innerHTML = data.purchases
      .map(function (p) {
        var when = new Date(p.createdAt).toLocaleString()
        return (
          '<div class="account-row"><span>' + escapeHtml(p.packageName) + ' — ' +
          escapeHtml(String(p.amount)) + '</span><strong>' +
          (p.status === 'paid' ? '✓ Paid' : p.status) +
          (p.mpesaReceipt ? ' · ' + escapeHtml(p.mpesaReceipt) : '') +
          '<br><small>' + escapeHtml(when) + '</small></strong></div>'
        )
      })
      .join('')
  }

  els.accountForm.addEventListener('submit', async function (e) {
    e.preventDefault()
    var phone = els.accountPhone.value.trim()
    if (!phone) return
    els.accountBtn.disabled = true
    els.accountBtn.textContent = 'Checking…'
    try {
      var res = await fetch('/account/' + encodeURIComponent(phone), {
        headers: { Accept: 'application/json' },
      })
      var data = await res.json()
      if (!res.ok) {
        showError(data.error || 'Could not load account')
        return
      }
      renderAccount(data)
      els.accountView.classList.remove('hidden')
    } catch (err) {
      showError('Network error — try again')
    } finally {
      els.accountBtn.disabled = false
      els.accountBtn.textContent = 'Check my account'
    }
  })

  var prefill = new URLSearchParams(window.location.search).get('code')
  if (prefill) {
    els.code.value = prefill
    setMode('voucher')
  }
})()
