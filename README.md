# ESP: Energy-Score Policy for One-Step Multimodal Action Generation

Project page for ESP, built on the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) (Bulma + bulma-carousel, no build step).

```
index.html
static/css/index.css      # template styles (unchanged)
static/css/esp.css        # ESP-specific additions (method colors, teaser, task headings)
static/js/index.js        # template script; carousel autoplay off, one slide at every width
static/images/            # teaser
static/videos/            # method_*.mp4: one-step generation clips rendered from esp-method-video (Remotion, Method-* compositions)
                          # drawer/pick/plate_*.mp4: real-world rollouts converted from the with-outcome GIFs
```

## Local preview

```bash
python -m http.server 8765
```

Then open http://localhost:8765.

## TODO

`index.html` marks every placeholder with `TODO`:

- Co-authors, affiliations, venue (hero section + `meta` tags)
- Paper / Code / arXiv button links
- Video section (YouTube ID) and BibTeX — commented out until available
