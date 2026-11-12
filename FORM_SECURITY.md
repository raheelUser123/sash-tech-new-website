# Form spam protection

All four form components use Cloudflare Turnstile. The shared POST /api/contact endpoint refuses email delivery when verification fails or either key is missing.

## Activate

1. Create a managed Turnstile widget in the Cloudflare dashboard for sashtech.digital (and any real preview domain).
2. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY in .env.local and the hosting environment. Keep the secret server-only. Do not use test keys on production.
3. Ensure NEXT_PUBLIC_SITE_URL matches the public hostname. Verification checks the hostname and website-form action.
4. Rebuild and deploy: the public site key is embedded at build time. GET /api/contact reports CAPTCHA configuration as booleans only.
5. Complete one form in the deployed browser and check the admin notification; try submission without a token and confirm rejection.

Auto-replies to visitor-supplied email addresses are disabled by default. Keep CONTACT_SEND_ACKNOWLEDGEMENTS=false unless explicitly needed.

## Limits

Per Node process: 3 requests/minute and 10/hour per forwarded IP, 20 SMTP attempts/hour across all forms (including any enabled acknowledgements), 15-minute duplicate suppression and five-minute token replay protection. JSON payloads are limited to 16 KiB while streaming. Only configured same-origin JSON submissions are accepted. Honeypots still drop bot submissions without email.

In-memory limits reset on restart and are not shared across workers. For multiple workers, also apply a shared edge/WAF rate limit to POST /api/contact. The hosting proxy must overwrite forwarded IP headers; IP-based limits alone are not a security boundary. CAPTCHA verification and the process-wide mail cap apply independently of IP headers.

## Hosting incident

These changes protect this Next.js endpoint after deployment. They cannot remove an existing SMTP queue or lift a hosting mail block. Review and purge the spam queue with the host, check for other PHP/WordPress forms or compromised scripts on the same hosting account, then ask the host to restore outgoing mail once protection is deployed.

## Verification

Run node scripts/test-contact.cjs. Tests mock CAPTCHA and SMTP and never send real email.
