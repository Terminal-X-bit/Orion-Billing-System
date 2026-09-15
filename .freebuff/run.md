# Run doc — Orion Hotspot Billing frontend (Vite dev server)

## Variant: captive-portal preview (bridge instead of Vite)

To preview the guest portal (`/portal`) served by the MikroTik bridge instead
of the dashboard:

```powershell
$env:ELECTRON_RUN_AS_NODE='1'
$env:SUPABASE_URL='http://127.0.0.1:9'   # placeholder; branding falls back to defaults
$env:SUPABASE_SERVICE_ROLE_KEY='preview'
$env:BRIDGE_API_KEY='previewkey'
$env:BRIDGE_PORT='8799'
(Start-Process -FilePath 'C:\Users\Chistine\AppData\Local\Programs\@codebufffreebuff-desktop\Freebuff.exe' `
  -ArgumentList 'index.js' -WorkingDirectory 'C:\Users\Chistine\Desktop\Orion-Billing-System-main\mikrotik-bridge' `
  -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' `
  -WindowStyle Hidden -PassThru).Id
```

- Serves `http://127.0.0.1:8799/portal` (no `--host` needed; the bridge binds all interfaces).
- With real Supabase creds in `mikrotik-bridge/.env`, branding comes from the
  `portal_settings` table (Settings -> Captive Portal Branding); with the
  placeholder above it falls back to defaults and `/packages` falls back to
  demo packages (full simulated M-Pesa flow still works).
- Same detach caveat as below: the wrapper may hang until timeout; confirm
  with `netstat -ano | findstr :8799`.

---

## Dashboard (Vite) — reproduce artifacts (fresh checkout)

1. **Node runtime**: this machine has no standalone Node.js/npm. Use the
   Electron runtime bundled with the Freebuff desktop app as Node:
   `C:\Users\Chistine\AppData\Local\Programs\@codebufffreebuff-desktop\Freebuff.exe`
   with env `ELECTRON_RUN_AS_NODE=1` (Node v20.18.3).
2. **Dependencies**: `node_modules` is committed-in-place/preinstalled. It was
   installed on Linux, so two Windows-native bindings are missing:
   - `@rolldown/binding-win32-x64-msvc@1.2.6` (already applied) — Vite's
     bundler crashes without it. Fetch the exact tarball from
     `https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.2.6.tgz`
     and extract into `node_modules/@rolldown/binding-win32-x64-msvc/`.
   - `@typescript/typescript-win32-x64@7.0.2` (already applied) — needed for
     `tsc -b` typechecks. Fetch
     `https://registry.npmjs.org/@typescript/typescript-win32-x64/-/typescript-win32-x64-7.0.2.tgz`
     and extract as `node_modules/@typescript/typescript-win32-x64/`
     (the tarball extracts as `package/`, so rename after extracting).
   (Alternative on a machine with npm: delete `node_modules` + `package-lock.json`, run `npm i`.)
3. **Env files**: `.env.local` already lives in this checkout (it IS the main
   checkout). In a separate worktree, copy `.env.local` from the main checkout
   instead of symlinking.
4. **Note**: Vite warns that Node 20.18.3 < required 20.19 — it still works.

## Run the server

Start detached via PowerShell (stdout and stderr must go to different files):

```powershell
$env:ELECTRON_RUN_AS_NODE='1'
(Start-Process -FilePath 'C:\Users\Chistine\AppData\Local\Programs\@codebufffreebuff-desktop\Freebuff.exe' `
  -ArgumentList 'node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5173','--strictPort' `
  -WorkingDirectory 'C:\Users\Chistine\Desktop\Orion-Billing-System-main' `
  -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' `
  -WindowStyle Hidden -PassThru).Id
```

- Host must be `127.0.0.1` explicitly — Vite's default binds IPv6 `::1` only,
  which the preview/loopback check cannot reach.
- The `Start-Process` wrapper command can hang until timeout because the
  redirected child keeps the console pipe open; the process still detaches and
  runs. Confirm with `netstat -ano | findstr :5173` (LISTENING pid) and
  `curl http://127.0.0.1:5173/`.
- Port: 5173 (Vite default; verified free).
- Stop: `powershell -NoProfile -Command "Stop-Process -Id <pid> -Force"`.
