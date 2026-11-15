# Michael's portfolio

A static site: three HTML pages, one stylesheet and two scripts. No build step.

## Files

- `index.html` — homepage: the film stage, the film selector and the programme list
- `project.html?p=<slug>` — one project page (brief → result, with Director / Editor commentary tracks)
- `about.html` — credits, experience and CV download
- `assets/content.js` — **all the text, links and project data. Edit this file.**
- `assets/styles.css` — look and feel (colours are at the top, in `:root`)
- `assets/site.js` — rendering logic. You shouldn't need to touch it.

## Adding video links

In `assets/content.js`, paste a Vimeo or YouTube link into a project's `video` field:

```js
video: "https://vimeo.com/123456789",
```

Leave it as `""` until you have a link; the page shows a labelled placeholder instead.

## Adding pictures

Put image files in `assets/img/` and reference them in the chapter `media` lists. For now the list items are labels that show as placeholders. Tell me the file names and I'll wire them in.

## Hosting

Recommended: push this folder to a GitHub repository, then connect it to Cloudflare Pages (or Netlify). Every change you push goes live automatically. You can add a custom domain later without changing anything here.
