# Bubbles — The Quiet Signal Experiment

A living experiment for people building thoughtful digital rituals, creative systems, and slower momentum.

Bubbles is for creators, operators, and curious minds who want to turn intention into a repeatable ritual—without the burnout loop.

## 🌐 View Live

Visit the site at: [https://your-github-username.github.io/bubbles-website/](https://your-github-username.github.io/bubbles-website/)

*(Update the URL above with your actual GitHub username)*

## 💡 About

- **What it is**: A quiet momentum signal built with intentional design
- **Who it's for**: People seeking clarity and less noise in their creative practice
- **Tech**: Static site with pre-animated sprite assets

## 🎨 Sprites & Animations

Animated sprites are pre-generated as GIFs in `/animations`:
- **Bubbles**, **Hearts**, **Stars** — animated with progressive brightness shifts
- Built with `sprite_processor.py` (not included in this deployment)

## 🚀 Development

The site is entirely static HTML/CSS/JavaScript—no backend required.

### Local Development
```bash
# Option 1: Simple file serving
python -m http.server 8000

# Option 2: Python server
python server.py
```

Then visit `http://localhost:8000`

### Sprite Processing (Local Only)
If you need to regenerate animations from source sprites:
```bash
python sprite_processor.py
```

## 📦 Deployment

This site is deployed on **GitHub Pages** for free hosting.

## 📄 License

© 2025 Bubbles. All rights reserved.
