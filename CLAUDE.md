# CLAUDE.md

## General

- Read `DECISIONS.md` before planning
- Read `eslint.config.js` and `tsconfig.json` before writing code
- You can run `pnpm run verify` to verify files after changes

## Organizing code

- Group by features, e.g. all files related to the feature "canvas" must be placed in `src/features/canvas` directory
- Put all feature-wide type definitions into `types.ts` file
- If some parts of the feature are public, i.e. imported and used in other features, always reexport them from `index.ts` first

## Writing state

- Business state should be in Redux store only, use `@reduxjs/toolkit` for that
- Actions, the initial state, the reducer, and selectors must all be declared in the same file, called `state.ts`
- All feature reducers must be added to `src/store.ts` and also to `src/types.ts`
- Use `react-redux` library to select state (always through selectors from `state.ts`) and dispatch actions

## Writing components

- Put one component per file: file `{ComponentName}.tsx` must have a single named export, `{ComponentName}`
- If a component takes props, always define an interface called `Props` first, and then do `({ myProp, ... }: Props) => { ... }`
- When you need a UI component (a button, a popover, a dialog, etc.), import it from `radix-ui` library
- Do not put business state into hooks, but e.g. `useState()` is okay for simple UI-specific state
- If you pass functions or other objects as props, memoize them first with `useCallback()` or `useMemo()`

## Styling components

- Use Tailwind CSS classnames whenever possible
- If you need custom styling for `{ComponentName}.tsx`, create a CSS modules file called `{ComponentName}.module.css` in the same directory
- Inside a CSS modules file, use the BEM convention, where BlockName == ComponentName
- Import CSS modules files as `import * as styles from '...';` and then use them as `styles['{classname}']`
- Use `clsx` library when composing multiple classnames dynamically
- After making changes to a component, check its corresponding CSS modules file, if it exists, and remove unused styles, if any

## Writing hooks

- Put one React hook per file: file `{useHookName}.ts` must have a single named export, `{useHookName}`
- If a hook accepts parameters, they all should come as a single `Props` object, the same as with components
- If a hook returns something, it should always return an object that can be immediately destructured: `const { myThing } = useHook();`
