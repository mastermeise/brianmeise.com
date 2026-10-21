# brianmeise.com

Brian Meise's personal site: a name, a one-line bio, a card for each project, an
email sign-up, and contact details. Plain static files on GitHub Pages (repo
`mastermeise/brianmeise.com`, branch `main`). The hosting, DNS and analytics setup
shared by all of Brian's sites is in `~/Dev/claude/CLAUDE.md`.

**Deploying:** push to `main`. Pages publishes it within a minute or two; check with
`gh api repos/mastermeise/brianmeise.com/pages/builds/latest --jq .status,.commit`.

## The homepage (`index.html`, live since 2026-10-20)

It started as Brian's phone mockup and was built and tuned at `/v5/` (see below).
Everything is in the one file: inline CSS and two small scripts, with no build step.

**Type.** Host Grotesk from Google Fonts, loaded as the variable font
(`wght@300..800`). There are two weights and two sizes. The "big type" is 22.5u at
weight 760 (`--w-bold`): the name, the bio, "Projects", the app names, the sign-up
headline, the email and the copyright. The "grey text" is 15u at weight 450
(`--w-text`): descriptions and platform labels. Hierarchy comes from colour only,
ink or grey, never from size or weight. Pairs read dark then grey: name over bio,
"More soon." over "Stay in the know.", email over copyright.

**Layout rule: everything scales with the column.** Sizes are in `--u`, which is
one design pixel at a 343px column (a 375px phone minus 16px gutters), and `.site`
is a size container (`--u: calc(100cqi / 343)`). Type, icons and padding all grow
with the column's width, so every line breaks at the same word on every screen:

- every project description is exactly two lines, so all cards are the same height;
- the bio breaks after "curious";
- app names and the sign-up headline stay on one line.

On desktop the column stops at `--max: 440px`, about 1.28x the phone size. **Any
change to the font, a weight, a size or the copy can move a line break**, so check
at 375px and 1440px afterwards. Measured windows for Host Grotesk at 760: the bio
breaks after "curious" anywhere from 21.3u to 24.3u, the sign-up headline fits on
one line up to 24.3u, and the app names up to 26.4u. The 320px first-generation
iPhone SE gets everything at about 0.84x (descriptions about 12.6px).

**Colour.** A near-neutral page (`#F8F7F1`), and each card tinted with its app
icon's hue at one shared lightness and chroma (OKLCH L .93, C .045), which is why
the four sit together. The values are written into `index.html` as hex; they came
from "Your pick" in the `/v5/` lab. The sign-up card is white with a faint edge.
There is no dark mode.

**Cards link to the stores,** not the product sites:

| Card | Link | Tracking |
|---|---|---|
| Northern Sky | App Store `id6809014456` | `ct=brianmeise` campaign token |
| Green Onions | App Store `id6793750166` | `ct=brianmeise` |
| Not-So-Fast | Chrome Web Store | `utm_source=brianmeise.com` |
| DMB 24/7 | dmb247.com (no store; the site is the app) | none |

`pt=129208576` is the App Store Connect provider token, the same one the product
sites use, and `ct=brianmeise` makes arrivals from this page their own campaign in
App Store Connect. Each card also has `data-goatcounter-click` (`store-northern-sky`,
`store-green-onions`, `store-not-so-fast`, `site-dmb247`), so taps show up in
GoatCounter (mastermeise.goatcounter.com).

**Icons** live in `img/apps/` (240px PNGs):

- `northern-sky.png` from `~/Dev/claude/attaboy/ios/NorthernSky/Assets.xcassets/AppIcon.appiconset/AppIcon.png`
- `green-onions.png` from `~/Dev/claude/cadenceplayer/.../AppIcon.appiconset/AppIcon-1024.png`
- `not-so-fast.png` from `~/Dev/claude/not-so-fast/site/icon-512.png`
- `dmb247.png` was made here, because DMB has no square icon: the dmb247 repo's
  `images/logo.png` split into "DMB" over "24/7" on `#1F1D1B`.

### Email sign-up: a Google Sheet, no mailing service

The "More soon. Stay in the know." card posts each address to a Google Apps Script
web app, which adds it to the Google Sheet **"brianmeise.com sign-ups"** in
mastermeise@gmail.com's Drive (tab "Sign-ups": date, email). Kit was set up and then
dropped: its free plan puts Kit branding on emails, and sign-ups will be few for a
while.

- The script source is [`v5/signup-sheet.gs`](v5/signup-sheet.gs), and its header
  has the setup steps. It is bound to the sheet, limited to that one spreadsheet
  (`@OnlyCurrentDoc`), deployed as a web app (Execute as: Me; Who has access:
  Anyone), and it runs as Brian.
- It accepts only a plain address, skips duplicates, refuses anything starting with
  `= + - @` (so no cell can turn into a formula), and silently accepts the `website`
  honeypot field so bots think they succeeded. It replies `{"status":"success"}`
  or `{"status":"failed"}`.
- The page posts URL-encoded with `fetch`, a "simple" request with no CORS
  preflight. Apps Script redirects to googleusercontent, which sends
  `Access-Control-Allow-Origin: *`. The card then shows "Boom! Talk soon." in place
  without changing height, and a GoatCounter `signup` event is counted.
- **To change the script, keep the URL:** Deploy → Manage deployments → edit →
  Version: New version. A *new* deployment gets a new `/exec` URL, which then has
  to be pasted into the form's `action` in both `index.html` and `v5/index.html`.
- Testing from the command line: `curl -L --data-urlencode "email_address=…" URL`.
  Don't add `-X POST`, because it breaks the redirect and returns a Drive "Page Not
  Found".
- To announce a launch, download the sheet as CSV. A Gmail BCC is fine for a
  handful of people; beyond that, use a sender that adds unsubscribe links.

`/subscribed/` (the "You're in" page) belonged to the old Kit plan and is not used
now.

### Footer

`mastermeise@gmail.com` written out is a `mailto` link. The icon button beside it
copies the address and shows a check for 1.6s; if the clipboard is refused, it
selects the address instead. The copyright year comes from JS, and the 2026
written in the HTML is the no-JS fallback.

## Favicon

`img/favicon.svg` is the source: the four card colours as stripes, in page order,
under a "B" from Host Grotesk ExtraBold (OFL) in the page ink, on a rounded tile.
`img/favicon-16.png`, `img/favicon-32.png`, the root `favicon.ico` (16/32/48) and
`img/apple-touch-icon.png` (180, a full square, because iOS rounds it itself) are
rasterised from it, so don't edit them by hand. On this Mac the only SVG rasteriser
is `qlmanage`, which paints transparency white and honours only the SVG's own
`width`/`height` (keep them at 1024). The recipe: render a copy of the SVG without
the clip at 1024 using `qlmanage -t -s 1024`, then in Python PIL cut the rounded
corners with an antialiased mask (radius 230/1024) and downsample with `LANCZOS`.
The glyph path came from `fontTools` (`SVGPathPen` on the 800-weight TTF Google
Fonts serves). The favicon is shared by every page on the site, old ones included.

## Other pages

| Path | What it is |
|---|---|
| `/v5/` | The colour lab for this design: the same page plus a panel of OKLCH sliders, presets, saved combos, Copy CSS and a shareable hash. Its "Your pick" preset is what's live. Noindexed, unlinked. |
| `/v1.html`, `/copylab.html`, `/iconlab.html` | The parked v1 direction and its labs. Noindexed. |
| `/graveyard/` | Retired projects (2017 site, Fonzi, …). |
| `/2017/`, `/archive/` | Old site relics. |
| `/amigos/join/`, `/.well-known/` | Amigos invite page and Apple universal-link file (`_config.yml` makes Pages include the dot-folder). |
| `/subscribed/` | Unused, from the Kit plan; see above. |

`PRD.md`, `BRAND.md` and `TODO.md` are design notes from the earlier directions.
`TODO.md` has the open items.
