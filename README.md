# Wingerworth Technology Solutions

A responsive React website for Josh and George's Derbyshire-based technology
business. It uses Vite for development and production builds, React for the
component UI, and React Router for the Home, About, and Some of our work pages.

## Project structure

- `src/App.jsx` contains shared site components and the three route pages.
- `src/styles.css` contains global styles, page layouts, responsive rules, and
  motion effects.
- `wingerworth-stag.svg` is the geometric stag illustration used in the home
  page hero.
- `public/` contains the original Wingerworth logo artwork with a transparent
  wordmark background.

## Run locally

Install dependencies and start the Vite development server:

```powershell
npm install
npm run dev
```

Create and locally preview a production build:

```powershell
npm run build
npm run preview
```

## Before publishing

1. In `src/App.jsx`, set `businessEmail` to the real address for enquiries. The
   contact form opens a prepared email and does not store form submissions.
2. Replace the clearly marked sample portfolio cards on the Some of our work
   page with approved customer names, project details, and imagery.
3. Confirm the service descriptions, business name, service area, and contact
   details before launch.
4. Add the final website domain to metadata when it is chosen.

The site uses a native system-font stack, animated CSS details, and respects
reduced-motion preferences. The home-page hero uses the geometric
`wingerworth-stag.svg` illustration. The header and opening animation use the
original Wingerworth artwork; the wordmark background is transparent.
