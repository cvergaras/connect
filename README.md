# Let's connect

A small, static academic networking site for Claudio Vergara-Sáez. Its permanent address is **https://cvergaras.github.io/connect/**. The public repository contains site files and QR assets only. Visitor submissions belong in Claudio's private Tally account, and optionally in a private Google Sheet.

## Configuration

Edit [`config.js`](config.js) for public links, email, role, institution, research descriptions and integrations. The settings `tallyFormUrl` and `calendlyUrl` are intentionally blank until their services are ready. Never put API keys, passwords, visitor messages or spreadsheet data in this repository. The public contact email in `config.js` is intentionally displayed on the site.

| Setting | What to enter |
| --- | --- |
| `tallyFormUrl` | The published Tally share URL, `https://tally.so/r/FORM_ID`. One form serves every topic. |
| `calendlyUrl` | The active, renamed “Let's Connect – Research & Ideas” event URL. Do not use the inactive old URL. |
| `email`, `linkedinUrl`, `clarenaUrl` | Public contact and research links. The CLARENA link currently points to a public UWA research page because its GitHub repository does not open for unauthenticated visitors. Replace it if the framework repository becomes public. |
| `research.description`, `research.clarena` | Short public research copy. |

Until Tally is configured, the form area explains that it is unavailable and provides email contact. Until Calendly is configured, the meeting section offers email contact. Changing an integration URL requires editing only `config.js` and publishing the commit. The QR code always points to the permanent site address, so those integration changes do not affect it.

## Set up the private Tally form

Create and publish **one** form in Claudio's own [Tally account](https://tally.so/). Do not create a public results page. Use a simple theme close to the site's off-white background (`#f6f7f3`), dark text (`#193235`) and teal accent (`#245e5b`). Tally's free theme settings support colours and fonts; custom CSS and removal of Tally branding are not needed.

Create these blocks in this order. Keep the spelling of the seven category answers exact: the website sends them as URL values.

| Block | Exact label / values | Requirement |
| --- | --- | --- |
| Hidden field | `category` | Receives the website button choice from the URL. Case-sensitive. |
| Single-choice | `What would you like to share?` | Required; set its **default answer** from hidden field `category`. Options: `Ask a question`; `Share feedback`; `Exchange research ideas`; `Propose a collaboration`; `Register interest in testing CLARENA`; `Receive CLARENA updates`; `Other enquiries`. A visitor may change the choice. |
| Long text | `Your message` | Show and require for Ask a question, Share feedback, Exchange research ideas, Propose a collaboration and Other enquiries. |
| Long text | `How might you use CLARENA?` | Show only for Register interest in testing CLARENA; optional. |
| Short text | `Name` | Optional. |
| Short text | `Institution or organisation` | Optional. |
| Single-choice | `Would you like a reply?` | Required for categories other than Receive CLARENA updates; choices `No` and `Yes`, with no preselected answer. |
| Email | `Email` | Show when reply is Yes, category is Register interest in testing CLARENA, category is Receive CLARENA updates, or updates consent is checked. Require when reply is Yes, category is Receive CLARENA updates, or updates consent is checked. It may remain optional for testing interest without a reply request. |
| Checkbox | `I agree to receive occasional research and CLARENA updates by email.` | Default unchecked. Show for all categories. Require it to be checked when category is Receive CLARENA updates; otherwise leave optional. No updates are sent unless checked. |

Add conditional logic in Tally for the show/hide and required rules above. Test all seven categories in Tally preview, especially the Email and consent rules. Anonymous questions and feedback must submit with Name, Institution and Email empty. A request for a reply or updates must require Email. Use a short thank-you message without a redirect.

In the form's **Settings**, enable **Self email notifications** to Claudio's private inbox. In **Integrations**, optionally connect **Google Sheets** using a private Google account and keep the sheet's sharing restricted. Tally's direct Sheets integration creates a row per submission; no Sheet URL or credentials belong in this repository. Review Tally's account access and retention settings yourself.

Copy the published share link from Tally's **Share** tab into `config.js` as `tallyFormUrl`. The site converts the `/r/FORM_ID` link into a standard inline `/embed/FORM_ID` iframe, passes `category` in the query string and offers a direct Tally link if the iframe does not display. The Tally embed widget handles responsive height. Do not paste an unverified form ID.

References: [Tally hidden fields](https://tally.so/help/hidden-fields), [pre-population](https://tally.so/help/pre-populate-form-fields), [conditional logic](https://tally.so/help/conditional-form-logic), [standard embeds](https://developers.tally.so/widgets/embeds), [owner notifications](https://tally.so/help/self-email-notifications), and [Google Sheets](https://tally.so/help/google-sheets-integration).

## Calendly

In Calendly, activate the event already renamed **“Let's Connect – Research & Ideas”** and change its old conference-specific URL. Confirm the new event opens for visitors, then paste that URL into `calendlyUrl` in `config.js`. Booking remains separate from Tally. The site displays an email option until an active URL is configured.

## QR codes

[`assets/connect-qr.png`](assets/connect-qr.png) is a high-resolution PNG; [`assets/connect-qr.svg`](assets/connect-qr.svg) is a scalable vector. Both encode `https://cvergaras.github.io/connect/` with a four-module white quiet zone and high error correction. Use the SVG for print and the PNG where SVG is unsupported.

To regenerate, install `qrcode[pil]==8.2` in a temporary Python environment and run `python scripts/generate_qr.py`. To decode both assets, install `zxing-cpp==3.0.0` in the same environment and run `python scripts/validate_qr.py`. The URL is fixed in the generation script to prevent accidental QR changes when updating site links. Do not regenerate it for routine Tally or Calendly updates.

## Deployment and maintenance

This is a buildless site: `index.html`, `styles.css`, `config.js`, `app.js` and `assets/` are served directly from the repository root. The `.nojekyll` file keeps GitHub Pages from processing the files with Jekyll. Publish from the `main` branch root in the repository's **Settings → Pages**. If using GitHub CLI, authenticate with `gh auth login -h github.com`, then create Pages with `gh api --method POST repos/cvergaras/connect/pages -f 'source[branch]=main' -f 'source[path]=/'` if Pages is not already enabled. Each push to `main` then updates the site. GitHub Pages can take a few minutes to publish; check the Pages settings or latest build status before distributing the QR code.

For ongoing maintenance, edit `config.js`, check the site locally with `python3 -m http.server 8000`, then commit and push. Keep the permanent URL and QR unchanged. The CLARENA software repository is separate from this site repository.

## Verification checklist

- Check 320 px mobile, tablet and desktop widths; keyboard focus; skip link; headings; readable contrast; and reduced-motion behaviour.
- Check LinkedIn, email, CLARENA research and Calendly links. A blank Calendly URL must keep the meeting email option visible.
- With a real Tally URL, choose each site button and confirm the form opens inline with the matching category selected. Test anonymous feedback, a reply request, CLARENA testing interest and an explicit updates opt-in; confirm private receipt in Tally and email, and remove test submissions.
- Decode both QR files to confirm the exact permanent URL. Print a test copy before using them on physical material.

The live Tally submission workflow and Calendly booking cannot be verified until Claudio completes those account settings.
