# wilker-portfolio

My personal site. The language mascots run the show: the Go gopher, Duke, the dotnet-bot and Ferris, in 3D, with most of the motion driven by GSAP.

## Stack

- React 19, TypeScript and Vite
- Tailwind CSS 4
- GSAP (ScrollTrigger, ScrollSmoother, SplitText, Flip) and Motion
- Three.js through React Three Fiber, drei, postprocessing and Rapier

## Running it

```bash
npm install
npm run dev
```

`npm run check` runs the type check, the linter and the unit tests. `npm run build` writes the static site to `dist`, with one HTML file per route for search engines.

## Layout

```
src/
  app/        routes, layouts and the app shell
  core/       entities, enums and ports, no React
  data/       content in Portuguese and English
  features/   one folder per section of the site
  scene/      the 3D stage, mascots and effects
  shared/     animation, audio, i18n, hooks and UI pieces
```

## Credits

The Go gopher was designed by Renée French and is licensed under CC BY 4.0. Duke is the Java mascot, released under the BSD license. Ferris was created by Karen Rustad Tölva and is in the public domain. The dotnet-bot belongs to the .NET Foundation. All of them appear here as a tribute; the names and logos are trademarks of their owners.
