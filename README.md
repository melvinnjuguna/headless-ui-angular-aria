# headless-ui-angular-aria

Accessible, unstyled UI components for Angular, built on [`@angular/aria`](https://angular.dev/guide/aria/overview) and styled with [Tailwind CSS](https://tailwindcss.com).

`@angular/aria` handles the hard parts: keyboard navigation, focus management and ARIA attributes. This project builds components on top of it, so styling stays entirely in your hands.

This is the companion repo for an Angular Kenya webinar on Angular ARIA and headless UI. All demo data is Kenya's 47 counties.

## Components

| Component     | Built on                                                     | Files                               |
| ------------- | ------------------------------------------------------------ | ----------------------------------- |
| County picker | `ngCombobox` with `ngListbox` in an `ngComboboxPopup`        | `src/app/components/county-picker/` |
| Tab group     | `ngTabs`, `ngTabList`, `ngTab`, `ngTabPanel`                 | `src/app/components/tab-group/`     |
| Accordion     | `ngAccordionGroup`, `ngAccordionTrigger`, `ngAccordionPanel` | `src/app/components/accordion/`     |
| Listbox       | `ngListbox`, `ngOption` (single and multi select)            | `src/app/components/listbox/`       |

Each component has a `*.stories.ts` file next to it that documents and tests it.

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

## Follow the webinar step by step

The county picker is built live in four steps. Each step is a git tag, so you can check out any step or diff one against the next.

| Tag      | What changes                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------- |
| `step-0` | A good-looking `div` select that only works with a mouse: no roles, no keyboard support        |
| `step-1` | Options become `ngListbox` and `ngOption`: roles, `aria-selected`, arrow keys and typeahead    |
| `step-2` | The trigger becomes an `<input ngCombobox>` that filters as you type, with the list in a popup |
| `step-3` | A Storybook story with a keyboard test and axe checks                                          |

```bash
git switch -c my-walkthrough step-0   # start from the broken version on your own branch
git diff step-0 step-1                # see exactly what each step changes
```

`main` holds the finished code.

## Scripts

| Command                   | What it does                                              |
| ------------------------- | --------------------------------------------------------- |
| `npm start`               | Runs the demo page at <http://localhost:4200>             |
| `npm run storybook`       | Opens Storybook at <http://localhost:6006>                |
| `npm test`                | Runs every Storybook story as a test in headless Chromium |
| `npm run typecheck`       | Type-checks components and stories                        |
| `npm run build`           | Builds the demo app for production into `dist/`           |
| `npm run build-storybook` | Builds a static Storybook into `storybook-static/`        |

## Project structure

```text
src/
  app/
    app.ts              Demo page that shows every component
    counties.ts         Kenya's 47 counties, in county-code order
    demo-data.ts        Adapts the counties for each component (shared by the app and the stories)
    components/         One folder per component, each with its stories
  styles.css            Global styles: imports Tailwind
.storybook/             Storybook config; preview.ts makes axe violations fail tests
vitest.config.ts        Runs the stories as browser tests
```

## Testing

Tests are written as Storybook stories. `npm test` runs each story in a real browser through the [Storybook Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon). Each story is checked for:

- **Rendering:** the story must render without errors.
- **Interactions:** any `play` function on the story is run, for example to simulate keyboard navigation.
- **Accessibility:** [axe](https://github.com/dequelabs/axe-core) checks through `@storybook/addon-a11y`. Any violation fails the test.

Use `npm test -- --run` for a single run without watch mode, for example in CI.

Automated checks don't catch everything. axe can't tell that a clickable `div` is pretending to be a select; only a keyboard test exposes it. For a page-level check, run `npm start` and use Lighthouse's Accessibility audit in Chrome DevTools.

## Styling

Global styles live in `src/styles.css`, which imports Tailwind. Style components with Tailwind utility classes in their templates.

`@angular/aria` exposes component state through attributes, so you style state with Tailwind variants instead of class bindings:

- `aria-selected:`, `aria-expanded:` and `aria-disabled:` for selection, open and disabled states
- `data-[active=true]:` for the highlighted option when focus stays in a combobox input
- `inert:hidden` for closed tab and accordion panels: `@angular/aria` marks them `inert` but doesn't hide them

## Gotchas

- **Global stylesheets are listed in three places.** If you add one, update the `styles` arrays in `angular.json` (the `build`, `storybook` and `build-storybook` targets) and in `vitest.config.ts`. The Storybook builder and standalone Vitest runs don't read the app's build options.
- **No tab is selected by default.** Pass `selectedTab` to the tab group, or no panel shows until someone clicks a tab.
- **The first test run after adding a new `@angular/aria` import can fail** with "Vite unexpectedly reloaded a test" while Vite pre-bundles the new entry point. Run the tests again.
- **Line endings are LF on every OS.** `.gitattributes` enforces this so Prettier's checks pass on Windows.

## Contributing

Contributions are welcome.

1. Fork the repo and create a branch from `main`.
2. Generate components with `ng generate component components/<name>`. The project defaults give you an inline template, inline CSS and no `.spec.ts` file.
3. Use the counties data from `demo-data.ts`, and add a `*.stories.ts` file next to each component covering its main states and keyboard behavior.
4. Before opening a pull request, check that `npm test -- --run`, `npm run typecheck` and `npm run build` all pass.

## License

[MIT](LICENSE) © 2026 Melvin Njuguna
