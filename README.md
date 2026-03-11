# Storion Documentation

This repository contains the official documentation for **[Storion](https://github.com/storionjs/storion)** — a framework-agnostic client-side database for the browser (localStorage, sessionStorage, IndexedDB).

The site is static HTML/CSS and is designed to be published on **GitHub Pages** (e.g. `https://yourusername.github.io/storion-docs/` or a custom domain).

---

## Deploy to GitHub Pages

### Option A: Publish from this repo (recommended)

1. **Create a new GitHub repository** (e.g. `storion-docs` or `storion-documentation`).

2. **Push this folder** as the root of that repo:
   ```bash
   cd storion-docs
   git init
   git add .
   git commit -m "Initial docs site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/storion-docs.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to the repo on GitHub → **Settings** → **Pages**
   - Under **Source**, choose **Deploy from a branch**
   - Branch: **main** (or **master**), folder: **/ (root)**
   - Save

4. The site will be available at:
   - `https://YOUR_USERNAME.github.io/storion-docs/`
   - Or, if the repo is named `USERNAME.github.io`, at `https://USERNAME.github.io/`

### Option B: Use the `docs/` folder in the main Storion repo

If you prefer to keep docs inside the main Storion repo:

1. Move the contents of this folder into a `docs/` directory in the Storion repo.
2. In the Storion repo: **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: **main**, folder: **/docs**.
3. The site will be at `https://USERNAME.github.io/storion/` (or your repo name).

---

## Local preview

Open the files directly in a browser, or use a simple static server:

```bash
# Python 3
python3 -m http.server 8000

# Node (npx)
npx serve .

# Then open http://localhost:8000
```

---

## Structure

- `index.html` – Introduction, features, quick example, links
- `quick-start.html` – Install and first steps
- `api.html` – Full API reference
- `query-language.html` – Query syntax and operators
- `config-format.html` – Database/table config (JSON)
- `css/style.css` – Styles (dark theme, responsive)
- `.nojekyll` – Tells GitHub Pages not to use Jekyll (keeps paths as-is)

---

## Links

- **Storion (library):** [github.com/storionjs/storion](https://github.com/storionjs/storion)
- **npm:** [@storion/storion](https://www.npmjs.com/package/@storion/storion)
