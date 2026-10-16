# Mazen Younis — Personal Portfolio

A responsive, multi-page personal portfolio for software developer Mazen Younis, based on five documented GitHub projects and professional experience.

## Run locally

From this directory, run `python3 -m http.server 8080` and open `http://localhost:8080`. You can also open `index.html` directly. No build system, Node dependencies or API keys are needed.

## Publish

Upload the **contents** of this folder to a new public GitHub repository (for example `mazen-younis.github.io`) and use **Settings → Pages → Deploy from a branch → main / (root)**. The site works from a repository subpath as well because links are relative. Alternatively, drag this folder onto Netlify Drop.

## Structure

- `index.html` — homepage
- `projects/` — five individual project case studies
- `styles.css` — design system and responsive styles
- `script.js` — navigation, filtering and micro-interactions
- `assets/img/` — images and concept illustrations
- `assets/cv/` — English and German CVs (provided by the site owner)

## Content and limitations

- The source uses real work, public GitHub URLs and the owner's CV.
- Bachelor industrial source is deliberately **not** copied onto the website.
- RTEMS and ESP32 public-source revisions are not asserted as newly retested.
- The computer-vision card uses a **labelled concept illustration**, not a fake model output; actual results are linked in GitHub.
- Ongoing Master's research is listed as work in progress.
- The cropped hero portrait is from the GitHub-profile screenshot supplied by the site owner. Replace `assets/img/mazen-portrait.webp` with a higher-resolution portrait whenever available.
- The site is **not published automatically**. It needs deployment using GitHub Pages or another static host.
- External Google Fonts are optional; fallbacks are provided.

## Updating projects

To change project descriptions or add future projects, edit the project definitions in `build_site.py` and run `python3 build_site.py` (requires Python 3 + Jinja2). Normal deployment does **not** require Python, Jinja2, or build steps.
