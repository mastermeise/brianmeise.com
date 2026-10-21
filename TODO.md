# TODO: Personal Site Redesign

> **2026-10-20: v5 is the live homepage**: name, bio, a card per project (store
> links), an email sign-up that goes to a Google Sheet, and the email/copyright footer.
> Built and colour-tuned at `/v5/`; README.md documents how it works. Everything below
> about v0.5, v1, the peeks, the icon labs and the Kit newsletter is history now (v1
> stays parked at `/v1.html`; sign-ups no longer use Kit or `/subscribed/`).
>
> **Open for v5:**
> - [ ] Email address: keep `mastermeise@gmail.com`, or switch to a `@brianmeise.com`
>       Workspace address (one `href` and the visible text in `index.html`).
> - [ ] Not-So-Fast's label says "Chrome App"; it's really a Chrome extension.
> - [ ] Maybe one line under the sign-up saying what the email is for.

> **STALE — 2026-08-05.** Phases 1–5 below were written for the poster direction with a
> signature hero and a work-history section. That build was replaced in one pass: the site
> is now `index.html` + `styles.css`, clean/neutral, bio + projects only. See the banners in
> [PRD.md](PRD.md) and [BRAND.md](BRAND.md).
>
> **What's actually left:**
> - [x] **v0.5 SHIPPED as the homepage, 2026-08-16.** `index.html` is now the deliberate
>       placeholder: 14-word bio (no apps sentence, no Hudson Valley clause), one-ink
>       red-orange, single mailto
>       footer, zero placeholder debt. **The full direction is parked at `/v1.html`**
>       (noindexed) — every open item below about the bio, peeks, goof, or subscribe
>       refers to `v1.html`. When v1 is polished: copy it over `index.html`, restore
>       the title/meta/canonical, delete `/v1.html`, push.
> - [x] ~~Favicon~~ — done 2026-08-23: a chunky grotesque "B", wine letter on the accent
>       ground (the more legible of the two — the wine-ground version sinks into dark tab
>       strips). Drawn geometry, not a font outline, so nothing is licensed in. Source of
>       truth is `img/favicon.svg`; `img/favicon-16.png`, `-32.png`, `apple-touch-icon.png`
>       and the root `favicon.ico` are all rasterised from it — regenerate rather than edit
>       them by hand. Linked from every current page; the root `.ico` covers the untouched
>       `2017/` and `archive/` relics. To flip the colours, swap the two `fill` values in
>       the SVG and re-rasterise.
> - [ ] **Pick an icon style** at `/iconlab.html` (not linked from the site): A chunky
>       flat (current), B ink line (all-ivory), C riso misprint, D sticker (die-cut +
>       shadow; replaced the too-similar "clean geometric"), E emoji, F woodcut (SVG
>       recreation of the Midjourney round — ink outline, crosshatch, brick/mustard/
>       olive palette). Mention pictograms get redrawn to match the winner. Midjourney
>       prompts are in `midjourney-prompts.md`.
> - [x] ~~Copy~~ — settled 2026-08-16 in round 2 of the copy lab: "Dad. Designer.
>       Director of Product Design at Sony Music. Building my own apps — Green Onions,
>       for runners, and Northern Sky, for mornings. Sometimes a goof, always curious,
>       usually in the Hudson Valley." (32 words). Peek-mentions: Dad (kids), Green
>       Onions, Northern Sky, goof (music-video stills); "curious" is a real link to
>       `/graveyard/`. Working file: `/copylab.html` (not linked from the site).
> - [ ] **Projects section is hidden** (two `hidden` attributes in `v1.html`). The old
>       projects now live at `/graveyard/` (2017 edition, DMB 24/7, Not So Fast, Fonzi —
>       linked from "curious" and the footer) and the live apps are bio mentions, so the
>       hidden block is close to redundant — decide whether to delete it. Its Attaboy
>       entry is renamed Northern Sky either way.
> - [ ] Palette is now a single fixed identity (wine `#45091E` / ivory / orange `#F4602C`,
>       from the LegalZoom-ad reference) — the light/dark auto-switch is gone. Revisit if
>       a light variant is ever wanted.
> - [ ] **Replace the peek placeholders with real photos.** All eight `<img>` tags in the
>       bio point at `img/peek/placeholder.svg`. Two per mention: Dad (the kids),
>       Green Onions, Northern Sky, goof (music-video stills). Keep the `width`/`height`
>       attributes so nothing reflows.
> - [ ] **Pick the goof video and paste its URL.** "goof" is a peek-button for now; a
>       comment in `v1.html` shows the one-tag flip to a hybrid `<a>` (hover peeks,
>       click plays the video). The tap-toggle script already skips anchor triggers.
> - [x] ~~Redraw the pictograms~~ — done 2026-08-16: all icons are now filled chunky
>       shapes (Kika-style). Mention icons ride `currentColor` (orange); the six
>       decorative `.doodle` interstitials may also use `--gold`/`--rose`/`--fg`.
>       Each svg carries its own fill/stroke attributes — `.pict`/`.doodle` CSS does
>       sizing only, so redrawing any icon means editing just its geometry in
>       `index.html`.
> - [ ] **Wire up the newsletter form.** Its `action` is the placeholder
>       `…/forms/YOUR_FORM_ID/subscriptions` and will 404 on submit. Recommended provider
>       is **Kit** (free to 10,000 subscribers, unlimited broadcasts). Steps:
>       1. Create a Kit account and an embeddable form; copy its form ID.
>       2. Paste it into the `action` in `index.html`.
>       3. In Kit, set the form's post-subscribe redirect to
>          `https://brianmeise.com/subscribed/`.
>       4. Conversion rate then reads as pageviews of `/subscribed/` ÷ pageviews of `/`
>          in GoatCounter (mastermeise.goatcounter.com). No JS or pixel needed.
>       Note: Kit's free tier puts Kit branding on its forms/emails; removing it needs the
>       $33/mo Creator plan. The field name is `email_address` (Kit's convention) — if you
>       switch to Buttondown or Mailchimp, change it back to `email`.
> - [ ] Confirm the footer email — using `mastermeise@gmail.com`, but brianmeise.com has
>       Google Workspace mail, so a `@brianmeise.com` address may be preferred
> - [ ] Confirm the Northern Sky URL — the Attaboy rename is official (2026-08-16), but
>       the hidden projects entry still points at `mastermeise.github.io/attaboy/`
> - [ ] Confirm Not So Fast's year (using 2012, the original extension)
> - [x] ~~Push when ready~~ — **pushed 2026-08-16, the site is LIVE.** brianmeise.com
>       serves v0.5; verified same day against the Pages build of 49a6429: `/`,
>       `/v1.html`, `/graveyard/`, `/2017/`, and `/archive/fonziapp/` all resolve.
>       The old hold (placeholder peeks, dead subscribe form) now only gates promoting
>       v1 over `index.html`, not the site being public.
> - [x] ~~Add a `.gitignore` for `.DS_Store`~~ — done 2026-08-16

See [PRD.md](PRD.md) for full scope.

## Phase 0 — Content & assets (blocking)
- [x] Recover 2017 site backup — copied into `/2017/` (live snapshot) and `/archive/fonziapp/`, `/archive/dmb247/` (project assets) from the local FTP backup folder
- [x] Signature animation recovered — CSS sprite-step animation, see PRD "Signature animation (recovered)"; decide reuse-as-is vs. regenerate sprite
- [ ] Update work history — confirm roles from 2017–present (recovered list only goes through 2016, see PRD)
- [ ] Collect remaining side project entries — image, 1–2 sentence description, link — for:
  - [ ] Green Onions (not in 2017 backup)
  - [ ] Amigos Fitness Club (not in 2017 backup)
  - [x] DMB 24-7 — description + link recovered; still need a screenshot/thumbnail (site is just a fullscreen YouTube embed)
  - [ ] Dog Days are Over Music Video (not in 2017 backup)
  - [x] Fonzi — logo, 6 screenshots, description, App Store link recovered
- [x] Visual direction confirmed — Inter (heavy weights for headlines), red-orange background + oxblood/maroon text, applied site-wide (see PRD "Visual direction"); exact hex values still need sampling from Brian's source reference

## Phase 0.5 — 2017 archive (mostly done)
- [x] Copy 2017 site into `/2017/` in this repo
- [x] Copy Fonzi and DMB 24-7 project assets into `/archive/`
- [x] Add a temporary "View the 2017 version" link on the current placeholder homepage
- [ ] Commit and push so `/2017/` goes live on brianmeise.com; verify it renders correctly (fonts, images, signature animation all load)
- [ ] Carry the "view 2017 site" link forward into the final site's footer/design (not just the placeholder)

## Phase 1 — Scaffold
- [ ] Set up `styles.css` and link it from `index.html`
- [ ] Load Inter (self-hosted woff2 or Google Fonts) at weights 400/500/800/900
- [ ] Define CSS custom properties for the palette (background red-orange, text oxblood) once exact hex values are confirmed
- [ ] Base layout: CSS reset, typography scale, container/max-width, spacing scale
- [ ] Mobile-first responsive breakpoints

## Phase 2 — Signature section
- [ ] Implement/port the signature animation (SVG stroke animation or reused asset)
- [ ] Add `prefers-reduced-motion` fallback (static signature)
- [ ] Verify animation performance (no layout shift, plays once on load)

## Phase 3 — Tagline section
- [ ] Add "I'm a designer. I keep things simple." directly below signature
- [ ] Typographic styling pass (size, weight, spacing)

## Phase 4 — Work history section
- [ ] Build semantic markup (e.g. `<section>` with a list of role entries)
- [ ] Style entries (company/title/dates/blurb layout)
- [ ] Populate with real content from Phase 0

## Phase 5 — Side projects section
- [ ] Build card grid markup (image, description, link) — reusable per-project template
- [ ] Style grid responsively (stacks on mobile, grid on desktop)
- [ ] Populate all 5 projects with real content/images/links from Phase 0
- [ ] Add descriptive `alt` text per project image

## Phase 6 — Polish & accessibility
- [ ] Check color contrast (WCAG AA)
- [ ] Keyboard navigation check (links focusable, visible focus states)
- [ ] Cross-browser check (Safari, Chrome, Firefox)
- [ ] Mobile device check (iOS Safari at minimum)
- [ ] Image optimization (compress project thumbnails)

## Phase 7 — QA & deploy
- [ ] Local review of full page top to bottom
- [ ] Verify all 5 project links resolve correctly
- [ ] Commit and push to `main`
- [ ] Confirm GitHub Pages build succeeds and brianmeise.com resolves correctly with the animation intact
