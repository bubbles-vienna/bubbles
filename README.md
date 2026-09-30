# Bubbles Vienna

Bubbles is a temporary social layer over Vienna.

Thirty strangers share one loose week across the city. Everyone receives the same coordinates and joins whatever fits their life: breakfast, coworking, groceries, exhibitions, dinner, music, or nothing at all.

## Website

The website is a static HTML, CSS, and JavaScript experience:

- `index.html` contains the invitation, schedule, explanation, and signup form.
- `style.css` contains the monochrome editorial layout and responsive styles.
- `script.js` controls the 30-circle counter, signup state, and sharing action.

## Run locally

```powershell
python server.py
```

Then open `http://localhost:8000/`.

## Deploy

```powershell
python server.py --deploy
```

The live site is configured at https://bubbles-vienna.github.io/bubbles/.
