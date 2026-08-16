# PRD: brianmeise.com Personal Site Redesign

> **PARTLY SUPERSEDED — 2026-08-05.** The built site (`index.html` + `styles.css`) diverges
> from this document on four points, all decided by Brian:
>
> | This PRD says | Actual |
> |---|---|
> | Red-orange poster palette, Archivo Black (see "Visual direction") | Clean neutrals, system font stack — references are leerob.com / brianlovin.com. See the banner in [BRAND.md](BRAND.md). |
> | Animated signature hero | Dropped. Asset stays in `/2017/`. |
> | Work History section | Dropped — the bio names the Sony role instead. |
> | Projects: Green Onions, Amigos Fitness Club, DMB 24-7, Dog Days Music Video, Fonzi | Attaboy, Green Onions, DMB 24/7, Not So Fast, Fonzi. Amigos and Dog Days are out; Attaboy and Not So Fast are in. |
>
> Still accurate: the Background, Tech approach, Non-goals, and the recovered-assets
> inventory. The "Open questions" list is stale — most were answered on 2026-08-05.

## Background
The site currently deploys to brianmeise.com via GitHub Pages (see `CNAME`) but consists of a single unstyled `index.html` with one `<h1>`. This PRD scopes a rebuild into a simple, single-page portfolio site.

## Goal
A minimal, fast-loading single-page site that introduces Brian, shows his professional work history, and showcases side projects — reflecting the stated design philosophy: "I'm a designer. I keep things simple."

## Non-goals
- No CMS, no backend, no build pipeline, no framework/dependencies.
- No blog, no contact form, no multi-page navigation (single page for v1).
- No analytics/tracking beyond what's already in place (none currently).

## Tech approach
- Plain HTML/CSS/vanilla JS, no build step — consistent with the current repo and easy to deploy via GitHub Pages with the existing `CNAME`.
- Single `index.html` + a `styles.css` + (if needed for the animation) a small `script.js` or inline SVG/CSS animation.
- Mobile-first responsive layout; site should work with JS disabled except for the signature animation itself.

## Page structure (top to bottom)

### 1. Signature (hero)
- A custom animation of Brian's signature, reused/adapted from a prior version he's created before (asset/code to be shared).
- Renders once on page load; should respect `prefers-reduced-motion` (fall back to a static signature image/SVG for users who have it set).
- Likely implemented as an animated SVG (stroke-dasharray/stroke-dashoffset technique) unless the prior version dictates otherwise once shared.

### 2. Tagline
- Static text directly below the signature:
  > I'm a designer. I keep things simple.
- Simple typographic treatment, no imagery.

### 3. Work History
- Lists current and past 9-5 roles in reverse-chronological order.
- Per-role fields: company, title, dates (start–end, or "Present"), optional 1–2 line description of scope/impact.
- Placeholder content until Brian supplies real entries.

### 4. Side Projects
- Grid/list of project cards, each with: image (thumbnail/screenshot), short description (1–2 sentences), and a link.
- Five projects, in the order given:
  1. Green Onions
  2. Amigos Fitness Club
  3. DMB 24-7
  4. Dog Days are Over Music Video
  5. Fonzi
- Placeholder image/description/link per project until Brian supplies real content.

## Design principles
- Minimal, uncluttered layout — whitespace-forward, limited color palette, one or two typefaces.
- The signature animation is the one moment of visual flourish; everything else stays quiet so it doesn't compete.
- Accessible by default: sufficient contrast, alt text on all project images, semantic HTML landmarks, reduced-motion fallback for the animation.

## Visual direction
Brian shared a reference image for the desired feel: a bold, flat, poster-style color block with heavy typography — this applies **site-wide**, not just to the hero.

- **Palette**: saturated red-orange background (~`#F5320D`–`#FF3300` range) with dark oxblood/maroon text (~`#4A1113`–`#551416` range) for high contrast without going full black. Exact hex values to be sampled/confirmed from Brian's source file rather than eyeballed from the screenshot.
- **Typography**: **Inter**, at heavy weights (800/900) for headlines and statements — large scale, tight line-height, short manually-broken lines (e.g. "I'm a designer." / "I keep things simple." each on their own line), left-aligned. Body copy (work history/project descriptions) should drop to a lighter Inter weight (400/500) at a readable size so dense content sections stay legible against the bold palette.
- **Application across sections**: the red/maroon identity carries through the signature, tagline, work history, and side-projects sections rather than being isolated to the hero — spacing and weight contrast (not a palette change) are what distinguish sections from each other.
- **Contrast check**: need to verify the oxblood-on-red combination and any card/link colors meet WCAG AA for body text sizes; large display type has more contrast leeway than small print (dates, blurbs).

## Assets recovered from the 2017 site backup
Source: `brianmeise.com FTP Backup` (local, not in this repo). Copied into this repo for reuse:

- **`/2017/`** — full snapshot of the 2017 homepage, now servable live at `brianmeise.com/2017` via GitHub Pages (linked from the current placeholder homepage). Includes original CSS, images, resume/portfolio PDFs, and copy.
- **`/archive/fonziapp/`** — 2011 Fonzi iOS app site: logo, app icon, 6 screenshots, App Store link (`http://itunes.apple.com/us/app/fonzi/id477600899`), and description copy ("A mobile jukebox that lets the crowd control the music").
- **`/archive/dmb247/`** — DMB 24-7 site: minimal PHP wrapper embedding a YouTube live-playlist ("We'll do it live. Bringing you live Dave Matthews Band shows 24/7. Deep Tracks Only."). No screenshot/thumbnail asset exists yet — will need one captured for the project card.

### Signature animation (recovered)
The 2017 signature was a **CSS sprite-sheet animation**, not SVG: `#signature` div with `background-image: signaturesprite.png` (an 18860×100px frame strip), animated via `@keyframes` stepping `background-position` from `0` to `-9020px` over 2s using `steps(22)`, delayed 1.8s, `forwards` fill (see `2017/css/style.css` lines 232–263, sprite at `2017/images/signaturesprite.png`, static fallback at `2017/images/signature.png`). This can likely be reused as-is (same technique, same or regenerated sprite) rather than rebuilt from scratch, with a `prefers-reduced-motion` media query added (the original had none).

### Work history (recovered, needs updating)
The 2017 site's "Recent Work Experience" section listed (most recent first as of 2017):
1. **Partners Andrews Aldridge** — London — 2014–2016 — Senior Digital Designer
2. **Noise** — New York City — 2009–2014 — Senior Designer
3. **Fonzi (iOS App)** — New York City — 2011–2012 — Designer and Founder

This is 9 years stale — Brian needs to confirm what's happened since 2016/2017 (likely several roles) and provide current employer/title.

## Open questions / inputs needed before build can be content-complete
- [x] Signature animation — recovered from 2017 backup (see above); confirm whether to reuse the exact sprite or regenerate it.
- [ ] Work history: confirm/update roles from 2017 onward (current + past 9-5 jobs) — the recovered list stops at 2016.
- [ ] Side projects — status per project:
  - [x] **Fonzi** — assets recovered (`/archive/fonziapp/`)
  - [x] **DMB 24-7** — description/link recovered (`/archive/dmb247/`); still need a screenshot/thumbnail image
  - [ ] **Green Onions** — not found in the 2017 backup; needs image, description, and link from Brian
  - [ ] **Amigos Fitness Club** — not found in the 2017 backup; needs image, description, and link from Brian
  - [ ] **Dog Days are Over Music Video** — not found in the 2017 backup; needs image, description, and link from Brian
- [ ] Any brand preferences (font, color palette) or is that left to design discretion? (2017 site used Proxima Nova + a light-grey/green/purple palette — could inform or be retired.)

## Success criteria
- Page loads fast (no heavy frameworks/assets), looks correct on mobile and desktop.
- Signature animation plays smoothly and degrades gracefully under reduced motion.
- All 5 project links work and open correctly.
- Site deploys cleanly to brianmeise.com via existing GitHub Pages setup.
