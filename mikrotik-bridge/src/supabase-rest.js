// Supabase REST (PostgREST) client for the bridge.
// Zero external dependencies; uses the service-role key server-side only.
const API_BASE = '/rest/v1'

function makeClient({ url, serviceKey }) {
  const base = String(url || '').replace(/\/$/, '')

  async function request(path, { method = 'GET', body, query = {}, prefer = [] } = {}) {
    const qs = new URLSearchParams(query).toString()
    const endpoint = `${base}${API_BASE}/${path}${qs ? `?${qs}` : ''}`
    const headers = {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
    }
    if (prefer.length > 0) headers.Prefer = prefer.join(',')
    const res = await fetch(endpoint, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Supabase REST ${method} ${path} failed: HTTP ${res.status} ${text.slice(0, 300)}`)
    }
    if (res.status === 204) return []
    const text = await res.text()
    return text ? JSON.parse(text) : []
  }

  return {
    /** Insert rows. Returns created rows when return=representation. */
    insert(table, rows, { returning = true } = {}) {
      return request(table, {
        method: 'POST',
        body: Array.isArray(rows) ? rows : [rows],
        query: returning ? { select: '*' } : {},
        prefer: returning ? ['return=representation'] : ['return=minimal'],
      })
    },

    select(table, { columns = '*', filters = {}, order, limit } = {}) {
      const query = { select: columns }
      for (const [col, cond] of Object.entries(filters)) query[col] = cond
      if (order) query.order = order
      if (limit) query.limit = String(limit)
      return request(table, { query })
    },

    update(table, filters, patch) {
      const query = { }
      for (const [col, cond] of Object.entries(filters)) query[col] = cond
      return request(table, {
        method: 'PATCH',
        body: patch,
        query: { select: '*', ...query },
        prefer: ['return=representation'],
      })
    },

    updateQuietly(table, filters, patch) {
      const query = {}
      for (const [col, cond] of Object.entries(filters)) query[col] = cond
      return request(table, { method: 'PATCH', body: patch, query })
    },
  }
}

module.exports = { makeClient }
