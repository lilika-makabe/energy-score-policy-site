# ESP: Energy-Score Policy for One-Step Multimodal Action Generation

Project page for ESP. Static HTML/CSS/JS (no build step).

```
index.html
static/css/index.css
static/js/index.js        # carousel (arrows, dots, swipe, keyboard; plays only the visible video)
static/images/            # teaser + one-step generation GIFs
static/videos/            # real-world results (MP4, converted from the original GIFs)
```

## Local preview

```bash
python -m http.server 8765
```

Then open http://localhost:8765.

## Editing

- Authors / affiliations / Paper・arXiv・Code buttons: uncomment the block under the title in `index.html`.
- Video: uncomment the `video-embed` block in the "Video" section and set the YouTube ID.
