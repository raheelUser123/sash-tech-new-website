# Namecheap cPanel deployment

This repository keeps the standard Vercel build and adds an optional standalone startup path for cPanel. No database is required. Do not upload Windows node_modules or a Windows-built standalone bundle to Linux.

## cPanel settings

- Node: 22.23.4 (the selected host version); Production mode.
- Root: /home/sashwbkb/nextjs-app
- URL: https://sashtech.digital
- Startup: server.js at the repository root, NOT a second custom Next server.
- Keep the hosting-assigned PORT. Do not set a fixed PORT. Passenger normally reverse-binds the first HTTP server to its own Unix socket even if PORT is absent.
- Set NODE_ENV=production and NEXT_PUBLIC_SITE_URL=https://sashtech.digital.
- Keep SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD and ADMIN_EMAIL in cPanel's server environment. Optional CONTACT_FROM_EMAIL must be a sender your mail provider permits. CONTACT_TO_EMAIL is a fallback recipient.
- NEXT_PUBLIC_CONTACT_EMAIL is public. Never prefix SMTP variables with NEXT_PUBLIC_.
- Keep the same public build environment in SSH as in cPanel. Runtime cPanel variables are not guaranteed to be inherited by an SSH shell. Do not paste credentials into command history; use the cPanel UI. Local env files are ignored by Git, but should not be deployed with artifacts.

## Update and build on Namecheap

Stop the application in cPanel before rebuilding its in-place .next directory. Run these commands in Bash with SSH access. The activation command below is the usual CloudLinux location for this exact application; if cPanel displays a different activation command, use the displayed command instead.

~~~bash
set -e
source /home/sashwbkb/nodevenv/nextjs-app/22/bin/activate
cd /home/sashwbkb/nextjs-app
git status --short
git pull --ff-only origin main
node --version
npm --version
# CloudLinux may manage node_modules as a virtual-environment symlink.
# Preserve that symlink; use clean npm ci for an ordinary node_modules directory.
if [ -L node_modules ]; then
  npm install --include=dev --include=optional --no-audit --no-fund
else
  npm ci --include=dev --include=optional --no-audit --no-fund
fi
export NODE_ENV=production
export NEXT_PUBLIC_SITE_URL=https://sashtech.digital
npm run audit:imports
npm run typecheck
npm run test:contact
node scripts/prepare-swc.cjs
npm run check:swc
npm run build
npm run prepare:standalone
test -f .next/standalone/server.js
test -d .next/standalone/public
test -d .next/standalone/.next/static
mkdir -p tmp
touch tmp/restart.txt
~~~

Use Start/Restart in cPanel after these commands; it is also the fallback if Passenger's restart-file watcher is unavailable. Do not run a separate background node process or pm2 alongside Passenger. Do not run npm prune or reinstall dependencies after preparing the build. Keep .next writable by the account for runtime caching. Root server.js loads .next/standalone/server.js in the Passenger process; the generated server sets its own application directory.

If the app directory is not a Git checkout yet, initialize it from the repository in an empty application root before running the update steps. Do not overwrite an existing checkout or hosting-managed files with git reset --hard.

## Missing-module diagnosis

The originally reported files are tracked at these exact paths:

- src/content/work.ts
- src/lib/wordpress/api.ts
- src/components/about/OurExpertise.tsx

The alias is @/* -> ./src/* in tsconfig.json; TypeScript is installed during the build even in Production mode. npm run audit:imports checks every local source import, exact Linux casing, untracked source/import targets and Git case collisions. If the server still reports a missing file, compare git rev-parse HEAD with GitHub and run git ls-files for that path; uploading only selected folders or pulling an old commit is insufficient.

## SWC / CloudLinux

An invalid ELF header from the musl binding is NOT proof of a working compiler. On glibc systems the matching binding is @next/swc-linux-x64-gnu; musl belongs to Alpine/musl systems. Next tries alternative bindings, so retain the complete diagnostic output, especially GNU errors such as a missing GLIBC symbol version.

~~~bash
node -p 'JSON.stringify({node:process.version,platform:process.platform,arch:process.arch,glibc:process.report.getReport().header.glibcVersionRuntime})'
getconf GNU_LIBC_VERSION
ldd --version
node scripts/prepare-swc.cjs
npm run check:swc
~~~

The locked @next/swc-wasm-nodejs version matches Next. prebuild stages it in Next 16.4.3's fallback directory, so a native compiler failure can use WASM without downloading a compiler during the build. Production uses next build --webpack, because Turbopack cannot be assumed to work with WASM. The existing webpack optimization settings remain intact. No system libc replacement, forced musl installation or unsupported production test flags are needed.

A successful compiler transform is a preflight only; npm run build must finish successfully. If GNU and WASM both fail, or the host kills the build for memory/process limits, stop and retain the full output. Build on a compatible Linux x64 Node 22 runner instead; a successful Windows build cannot certify CloudLinux compatibility. The Linux validation workflow checks the normal and WASM builds and prepares an env-free standalone archive. A Linux artifact still needs testing against the host's native sharp/image dependencies and libc; CI success alone does not certify an older CloudLinux runtime.

## Verify the deployed application

~~~bash
curl -I https://sashtech.digital/
curl -I https://sashtech.digital/about
curl -fsS https://sashtech.digital/api/contact
~~~

The contact health endpoint returns booleans, never credentials. It checks configuration presence, not SMTP connectivity. Open a real /_next/static asset and a public image URL from the page to confirm assets return 200. Test one enquiry using your own controlled inbox: check the admin notification and customer thank-you email, including spam folders. No real emails are sent by test:contact. SMTP rejection returns a failed submission; acknowledgement failure after admin delivery is logged separately. Use your mail provider's authenticated SMTP port: 465 for implicit TLS or 587 for STARTTLS.

Vercel continues using npm run build and its normal Next adapter; it does not execute root server.js. Existing pages, metadata, animations, SMTP handlers and redirects are retained. Blog API remains disabled as requested.

## Sources

- https://www.namecheap.com/support/knowledgebase/article.aspx/10047/2182/how-to-work-with-nodejs-app/
- https://nextjs.org/docs/app/api-reference/config/next-config-js/output
- https://nextjs.org/docs/messages/failed-loading-swc
- https://www.phusionpassenger.com/library/indepth/nodejs/reverse_port_binding.html
