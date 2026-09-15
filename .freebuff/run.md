# Run doc — Orion Hotspot Billing frontend (Vite dev server)

## Reproduce artifacts (fresh checkout)

1. **Node runtime**: this machine has no standalone Node.js/npm. Use the
   Electron runtime bundled with the Freebuff desktop app as Node:
   `C:\Users\Chistine\AppData\Local\Programs\@codebufffreebuff-desktop\Freebuff.exe`
   with env `ELECTRON_RUN_AS_NODE=1` (Node v20.18.3).
2. **Dependencies**: `node_modules` is committed-in-place/preinstalled. It was
   installed on Linux, so the Windows-native rolldown binding is missing. Fix
   (already applied here) by fetching the exact-version tarball:
   `@rolldown/binding-win32-x64-msvc@1.2.6` from
   `https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.2.6.tgz`
   and extracting it into `node_modules/@rolldown/binding-win32-x64-msvc/`.
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
