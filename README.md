# headless-ui-angular-aria

Accessible, unstyled UI components for Angular, built on [`@angular/aria`](https://angular.dev/guide/aria/overview) and styled with [Tailwind CSS](https://tailwindcss.com).

`@angular/aria` handles the hard parts: keyboard navigation, focus management and ARIA attributes. This project builds reusable components on top of it, so that styling stays entirely in your hands.

> **Status:** early development. The tooling is set up and the first components are on the way.

## Tech stack

- [Angular 22](https://angular.dev) with standalone components and signals
- [`@angular/aria`](https://angular.dev/guide/aria/overview) for accessibility behavior
- [Tailwind CSS v4](https://tailwindcss.com) for styling (plain CSS, no Sass)
- [Storybook 10](https://storybook.js.org) to develop and document components
- [Vitest](https://vitest.dev) with Playwright to run stories as tests, including accessibility checks

## Getting started

You need Node.js `^22.22.3`, `^24.15.0` or `>=26`.

```bash
git clone https://github.com/melvinnjuguna/headless-ui-angular-aria.git
cd headless-ui-angular-aria
npm install
npx playwright install chromium   # one-time, needed for npm test
```

## Scripts

| Command                   | What it does                                                    |
| ------------------------- | --------------------------------------------------------------- |
| `npm start`               | Runs the demo app at <http://localhost:4200>                    |
| `npm run storybook`       | Opens Storybook at <http://localhost:6006>                      |
| `npm test`                | Runs every Storybook story as a test in headless Chromium       |
| `npm run build`           | Builds the demo app for production into `dist/`                 |
| `npm run build-storybook` | Builds a static Storybook into `storybook-static/`              |

## Testing

Tests are written as Storybook stories. `npm test` runs each story in a real browser through the [Storybook Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon). Each story is checked for:

- **Rendering:** the story must render without errors.
- **Interactions:** any `play` function on the story is run, for example to simulate keyboard navigation.
- **Accessibility:** [axe](https://github.com/dequelabs/axe-core) checks through `@storybook/addon-a11y`. Violations currently show up in the test UI without failing the run. To make them fail CI, set `a11y.test` to `'error'` in `.storybook/preview.ts`.

Use `npm test -- --run` for a single run without watch mode, for example in CI.

## Styling

Global styles live in `src/styles.css`, which imports Tailwind. Both the app and Storybook load this file. Style components with Tailwind utility classes in their templates.

`@angular/aria` exposes component state through ARIA attributes, so you can style state with Tailwind's `aria-*` variants, for example `aria-selected:bg-blue-600` or `aria-expanded:rotate-180`.

## Contributing

Contributions are welcome.

1. Fork the repo and create a branch from `main`.
2. Generate components with `ng generate component <name>`. The project defaults give you an inline template, inline CSS and no `.spec.ts` file.
3. Add a `*.stories.ts` file next to each component, covering its main states and keyboard behavior.
4. Before opening a pull request, check that `npm test -- --run` and `npm run build` both pass.

## License

[MIT](LICENSE) © 2026 Melvin Njuguna
