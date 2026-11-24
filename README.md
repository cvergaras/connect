# Let's connect

A small, static academic networking site for Claudio Vergara-Sáez. Its permanent address is **https://cvergaras.github.io/connect/**. Visitor submissions belong in Claudio's private Tally account, and optionally in a private Google Sheet. Only questions and answers explicitly approved for publication are copied into this public repository.

## Configuration

Edit [`config.js`](config.js) for public links, email, role, institution, research descriptions and integrations. `tallyFormUrl` points to the published private submission form; `calendlyUrl` is blank until the renamed event is active. Never put API keys, passwords, visitor messages or spreadsheet data in this repository. The public contact email in `config.js` is intentionally displayed on the site.

| Setting | What to enter |
| --- | --- |
| `tallyFormUrl` | The published Tally share URL, `https://tally.so/r/FORM_ID`. One form serves every topic. |
| `calendlyUrl` | The active, renamed “Let's Connect – Research & Ideas” event URL. Do not use the inactive old URL. |
| `email`, `linkedinUrl`, `clarenaUrl` | Public contact and research links. The CLARENA link currently points to a public UWA research page because its GitHub repository does not open for unauthenticated visitors. Replace it if the framework repository becomes public. |
| `research.description`, `research.clarena` | Short public research copy. |
| `approvedQuestions` | Reviewed, anonymised question-and-answer pairs approved for public display. Never paste a raw Tally submission. |

The Tally form is published at **https://tally.so/r/e5alZJ** and opens inline from the site. Until Calendly is configured, the meeting section offers email contact. Changing an integration URL requires editing only `config.js` and publishing the commit. The QR code always points to the permanent site address, so those integration changes do not affect it.

## Private Tally form

The form is published in Claudio's [Tally account](https://tally.so/) as **“Let's connect — Research & Ideas”**. [Edit it here](https://tally.so/forms/e5alZJ/edit). It uses the site's off-white background (`#f6f7f3`), dark text (`#193235`) and teal accent (`#245e5b`). Keep submissions private and do not create a public results page.

The form has only four visible fields, in this order: **Name** (optional), **Institution** (optional), **Email** (optional), and **Message** (required). This allows anonymous messages. A hidden `category` field records which website topic button the visitor clicked; it is blank when someone opens Tally directly. There are no visible topic, reply, update or public Q&A consent questions. The thank-you page confirms private receipt.

An email address is needed to reply, follow up about CLARENA testing, provide requested updates, or obtain permission to publish a question. Treat only an explicit request for updates as an opt-in; an email address entered for another topic is not consent to updates. If the visitor gives no email, keep their question private. Never publish a submission or answer without explicit permission obtained separately and Claudio's review.

**Self email notifications are enabled with Tally's default recipient and content.** The free plan did not allow setting a custom recipient, subject or message, so confirm the Tally account owner receives a test notification. Directing notifications specifically to `claudio.vergarasaez@research.uwa.edu.au` requires [Tally Pro](https://tally.so/pricing?source=ai) or an account-level email arrangement. The form remains accessible in Tally's private Submissions view regardless of email delivery. In **Integrations**, optionally connect **Google Sheets** using a private Google account and keep the sheet's sharing restricted. No Sheet URL or credentials belong in this repository. Review Tally's account access and retention settings yourself.

## Public Q&A moderation

The public Q&A is intentionally separate from Tally's private response inbox. The simplified form has no publication consent field. To publish a question, obtain the submitter's explicit permission through a separate reply, then review the wording, remove names, institutions, email addresses, links to private material and identifying details, and write your own answer. Add only the approved public text to `approvedQuestions` in `config.js`, for example:

```js
approvedQuestions: [
  { question: "How does CLARENA couple a lake and aquifer?", answer: "A reviewed answer written by Claudio." }
],
```

Commit and push the change; GitHub Pages will update the section. Do not automatically sync Tally, Notion or Google Sheets rows to the public site. The empty state remains until the first approved pair is added. To withdraw a pair, remove its object from `approvedQuestions` and publish a new commit; remember that public Git history retains earlier versions, so obtain consent before initial publication and do not include personal details.

The published share link is in `config.js` as `tallyFormUrl`. The site converts the `/r/FORM_ID` link into a standard inline `/embed/FORM_ID` iframe, passes `category` in the query string and offers a direct Tally link if the iframe does not display. The Tally embed widget handles responsive height.

References: [Tally hidden fields](https://tally.so/help/hidden-fields), [standard embeds](https://developers.tally.so/widgets/embeds), [owner notifications](https://tally.so/help/self-email-notifications), and [Notion integration](https://tally.so/help/notion-integration).

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
- Choose each site topic button and confirm the form opens inline with exactly four visible fields. Test anonymous submission and a submission with contact details; confirm private receipt in Tally and the owner email, and remove test submissions.
- Decode both QR files to confirm the exact permanent URL. Print a test copy before using them on physical material.

The previous form layout was verified in Chrome, and Claudio made a completed manual test submission. After any form restructuring, repeat the visual check in a normal browser. Calendly booking remains unavailable until Claudio activates the renamed event and updates its URL.
