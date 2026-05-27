# Logos

Drop your logo files into this folder. They will be served from the website at `/logos/<filename>`.

## Preferred format

- **SVG** is best — scales perfectly, no jagged edges at any zoom level.
- **PNG** with transparent background works too (use at least 256×256).
- Avoid JPG (no transparency).

## Naming convention

Use **lowercase, kebab-case** filenames so referencing them stays clean:

```
react.svg
next-js.svg
tailwind-css.svg
visual-studio-code.svg
adobe-illustrator.png
```

## After dropping files

Tell me which logos you added and where you want them placed in the hero —
I will wire them into `components/ui/tech-logo-field.tsx` and replace or
extend the current set.

## Tip — finding clean SVG logos quickly

- https://simpleicons.org — single-color brand SVGs (already used as the fallback)
- https://svgporn.com — full-color brand SVGs
- The brand's own press / media kit (most reliable)
