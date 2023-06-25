
# Simple Todo List

A sample for showing the usage of `lodash/fp` for my article - [Another post that talks about lodash/fp (with Vue)](https://dev.to/allieschen/another-post-that-talks-about-lodashfp-with-vue-46ip-temp-slug-6896279?preview=dc066ec866f8536f27da527ea261773cbb49483f4088e37c3ef2793edd38c30a5d169528dd92b75106dc550be616298682ae3817b5f0dd8369fffe28)

The app started with the template of

- [Vite](https://vitest.dev/)-- Bundler
- [TypeScript](https://www.typescriptlang.org/)-- Provide type checking in IDE
- [Vue 3 - Composition API](https://vuejs.org/)-- JS front-end framework

and (mainly) uses the following libraries:

- [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide)-- Utility functions
- [Tailwind CSS](https://tailwindcss.com/)-- Provide Atomic CSS
- [Tailwind Elements](https://tailwind-elements.com/)-- UI components

## Installation

Install the dependencies: `npm install`

Run the dev server: `npm run dev`

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.