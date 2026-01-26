# GitHub Pages Demo

This folder contains a standalone static demo site (no Next.js build required).

## Enable GitHub Pages

1. In GitHub: Settings -> Pages
2. Source: Deploy from a branch
3. Branch: `main` (or your default) and folder: `/docs`

After saving, GitHub will provide a URL like:

`https://<username>.github.io/<repo>/`

## Local Preview

Any simple static server works. For example:

```bash
python3 -m http.server 8080 --directory docs
```

Then open `http://localhost:8080/`.
