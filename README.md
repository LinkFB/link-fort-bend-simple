# Link Fort Bend — Simple Site

A stripped-down, 4-page version of the Link Fort Bend site: `index.html`, `about.html`, `donate.html`, `contact.html`, plus `css/style.css`, `js/main.js`, and `images/`. No build step — plain HTML/CSS/JS, works with any free static host (see below for GitHub Pages).

This is a separate, simpler version of the full site — the full 6-page version (with Opportunities and Events) lives in its own folder/zip so the two never get mixed up.

## Still needed before this goes fully live

1. **Social links.** Facebook and Instagram links in the footer are still placeholders (`#`) on every page.

## Already wired up

- **Homepage** now shows your real September 2026 volunteer matching event flyer, with working sign-up buttons pulled straight from the flyer's QR codes (Thursday → mobilize.us/s/dArUMn, Saturday → mobilize.us/s/8jjdfS).
- **Donate page** links straight to your ActBlue page: `https://secure.actblue.com/donate/indivisiblelfb1472032159`
- **Contact ("Get Matched") page** no longer shows a mailing address or social links — just general inquiries and the organization-leader note, plus the embedded volunteer sign-up form.

## Deploying for free with GitHub Pages

1. Create a free GitHub account if you don't have one (github.com).
2. Create a **new, separate repository** from your full-site one — e.g. `link-fort-bend-simple`. Keep it public.
3. Upload every file in this folder (keeping the `css/` and `js/` and `images/` folders intact) to the repository — drag-and-drop works fine in GitHub's web UI, just make sure you're selecting the actual folders, not their contents individually.
4. In the repo, go to **Settings → Pages**.
5. Under "Build and deployment," set **Source** to "Deploy from a branch," pick the `main` branch and `/ (root)` folder, then save.
6. GitHub will give you a live URL within a minute or two, usually `https://yourusername.github.io/link-fort-bend-simple/`.

## Local preview

Double-click `index.html` to open it in a browser — no server needed.
