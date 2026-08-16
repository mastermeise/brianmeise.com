> **SUPERSEDED — 2026-08-05. Not the current identity of brianmeise.com.**
>
> Brian chose a clean, quiet direction instead, referencing leerob.com and brianlovin.com:
> warm neutrals, high contrast, system font stack, hierarchy from weight and space rather
> than scale and colour. The live system is `styles.css`; there is no red ground, no
> Archivo Black, and no painted wash on the site.
>
> `brand.css` was deleted — every token and treatment it held is reproduced verbatim in the
> code blocks below, so nothing is lost. This document is kept as a record of the poster
> exploration and is the place to start if that direction is ever revived.
>
> **Do not build against this file.** Anything below describing what is "decided" refers to
> the retired poster system, not to the current site.

---

# Brand foundation — painted type system

Starting point for personal branding work. This documents a type treatment that's already been prototyped and approved; treat the tokens and the headline treatment as decided, and build outward from them.

**Stack context:** brianmeise.com is a static site on GitHub Pages, auto-deploying from `main`. No build step. Write plain CSS with custom properties — don't introduce Tailwind, a preprocessor, or a bundler unless explicitly asked.

---

## 1. Tokens

```css
:root {
  /* colour — two inks, nothing else */
  --ground:      #F5320D;  /* red-orange, the sheet */
  --ink:         #8E0124;  /* burgundy, all type */
  --ink-deep:    #840121;  /* burgundy darkened 7%, used only inside the wash */

  /* ink density tiers — hierarchy comes from opacity, not from new colours */
  --ink-100: rgba(142, 1, 36, 1);
  --ink-94:  rgba(142, 1, 36, .94);
  --ink-86:  rgba(142, 1, 36, .86);
  --ink-72:  rgba(142, 1, 36, .72);
  --ink-45:  rgba(142, 1, 36, .45);  /* rules, dividers */

  /* type */
  --display: 'Archivo Black', 'Arial Black', Impact, sans-serif;
  --text:    'Archivo', system-ui, sans-serif;

  /* wash geometry */
  --wash-angle: 88deg;
}
```

**Two inks is the rule, not a starting palette.** The whole system is a one-colour print job on coloured stock. Adding a third colour breaks the premise. If something needs to separate visually, change its ink density or its size — not its hue.

---

## 2. The signature treatment — painted headline

The headline is not flat burgundy. It carries a slow tonal drift across the letterforms, like gouache applied by hand where the brush loads unevenly. This is the one memorable element of the system; everything else should stay quiet around it.

```css
.headline {
  font-family: var(--display);
  text-transform: uppercase;
  letter-spacing: -0.034em;
  line-height: 0.84;

  color: transparent;
  background-image: linear-gradient(var(--wash-angle),
    rgba(142, 1, 36, 0.820)   0%,
    rgba(142, 1, 36, 0.973)  34%,
    rgba(132, 1, 33, 1)      63%,
    rgba(142, 1, 36, 0.883) 100%);
  -webkit-background-clip: text;
          background-clip: text;
}
```

### Why it's built this way

- **Alpha, not different hexes.** Every stop is the same ink at a different opacity, so the wash is tinted by whatever sits behind it. Put the headline over a gradient, a photo, or a different ground and it re-tints itself with no stops to recompute.
- **One stop is opaque and slightly darkened** (`#840121` at 63%). Alpha can only lift the ink *toward* the ground — it can never deepen it. That stop is the only way to keep a darker patch in the wash. Don't delete it.
- **No SVG filter.** An earlier version used `feTurbulence` + `feDisplacementMap`. It was rejected: filters rasterize the text, softening edges at display sizes, and the grain read as noise rather than paint. Gradients keep the letterforms perfectly crisp and cost nothing.
- **Frequency is the whole point.** The variation must be low-frequency — soft areas spanning whole words. Anything that reads as visible grain or speckle is wrong.

### Fallback

`background-clip: text` with `color: transparent` fails to invisible text if unsupported. Guard it:

```css
.headline { color: var(--ink); }

@supports (-webkit-background-clip: text) or (background-clip: text) {
  .headline { color: transparent; background-image: linear-gradient(/* … */); }
}
```

---

## 3. Hierarchy by ink density

All type is the same burgundy. Levels are set by opacity, which also shifts them warmer as they lighten — thinner ink, not grey text.

| Role | Density | Token |
|---|---|---|
| Headline | 100% + wash | `--ink-100` |
| Deck / standfirst | 94% | `--ink-94` |
| Body copy | 86% | `--ink-86` |
| Eyebrow, captions, metadata | 72% | `--ink-72` |
| Rules, dividers, borders | 45% | `--ink-45` |

Below about 65% type starts dissolving into the ground. Don't add tiers past the five above.

---

## 4. Type scale

```css
--size-display: clamp(56px, 13.5vw, 178px);  /* headline, uppercase, wash applied */
--size-deck:    clamp(20px, 2.6vw, 29px);    /* 600 weight, max-width 24ch */
--size-body:    17px;                        /* line-height 1.62, max-width 38ch */
--size-caption: 12px;                        /* letter-spacing .05em */
--size-eyebrow: 11px;                        /* uppercase, letter-spacing .2em, 700 */
```

The wash is for display sizes only — roughly 40px and up. Applied to body copy it turns to mush, and there isn't enough letterform area for the drift to register.

---

## 5. Accessibility — a deliberate decision, do not "fix"

Burgundy on this ground measures **2.45:1**. That fails WCAG AA, including the 3:1 large-text threshold. This is an accepted trade for a poster-led identity where the low contrast is doing intentional aesthetic work.

**Do not silently raise the contrast, lighten the ink, or darken the ground to make it pass.** If a specific surface genuinely needs to be accessible — a contact form, a résumé page, anything with real reading matter — flag it and ask rather than adjusting the tokens.

For reference, if an accessible variant is ever requested: `#1C0A06` (warm near-black) on the same ground gives 4.88:1 and passes at every size.

---

## 6. Open slots

- **Logo** — a minimal, friendly-but-edgy skull mark is in exploration, not resolved. Leave a placeholder; don't generate or substitute a mark.
- **Tagline** — working direction is "making the complex feel obvious." Use it in the deck position if copy is needed.
- **Typeface** — Archivo Black is the working display face and is fine to build against. Worth testing alternates before it's locked; if you're asked to explore, the brief is a heavy grotesque with tight apertures, not a serif.

---

## 7. Build notes

- Ship one `brand.css` with the tokens and the two treatment classes. Keep it dependency-free.
- The wash is a static gradient tied to element geometry, so every headline on a page gets an identical drift. Where several sit near each other, vary `background-position` or `--wash-angle` per instance so they don't stamp.
- Respect `prefers-reduced-motion` on anything animated. The wash itself is static and needs no guard.
- For OG images and anything that leaves the browser, render the headline to SVG or PNG — `background-clip: text` won't survive the trip.

---

## 8. Content-section light/dark themes (added)

Per §5's own carve-out — flag reading-heavy surfaces rather than silently adjusting tokens — Brian confirmed: keep the one-ink red-poster system exactly as documented for the hero, but give work history and side-project copy (real reading matter) a proper light and dark mode instead of forcing the 2.45:1 poster contrast onto paragraphs.

**Scope:** the hero/signature stays fixed on the red ground always, regardless of OS preference — it's the identity, not a themeable surface. Only content sections (work history, side projects) auto-switch via `prefers-color-scheme`. Wrap those sections in `.content-section`.

**Mechanism:** `brand.css` now defines `--ground-content` and a `--tier-100/94/86/72/45` alias scale at `:root`, defaulting to the existing burgundy tiers (so `.eyebrow`/`.deck`/`.body`/`.caption`/`.rule` are unchanged outside `.content-section`). Inside `.content-section`, `prefers-color-scheme` media queries redefine those aliases:

| | Ground | Ink (body) | Accent | Contrast |
|---|---|---|---|---|
| Light | `#FBF1EC` (warm paper, not generic white) | `#1C0A06` | `#8E0124` (brand burgundy) | 17.25:1 ink, 8.67:1 accent |
| Dark | `#1C0A06` (the same accessible ink, now used as ground) | `#F5E9E2` (warm ivory) | `#F5320D` (brand red) | 16.1:1 ink, 4.88:1 accent |

Both grounds and both accents stay in the brand's existing hue family (the documented accessible ink `#1C0A06`, and the brand's own red/burgundy) rather than introducing unrelated neutrals — light and dark are new *contexts* for the same two-ink material, not a third palette.

No new component classes were added — `.eyebrow`, `.deck`, `.body`, `.caption`, `.rule` all work unchanged inside `.content-section` since they already read from the tier aliases.
