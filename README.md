# welbex

## TASK

It is necessary to develop a table in the SPA format on Vue. must be completed within 72 hours

Requirements for the table:

1) The table should contain 4 columns:

- Date
- Name
- Quantity
- Distance

2) The data for verification must be registered in the project (in data(){}, Vuex, an imported JSON object, a public API server on the Internet, a locally deployed mock server - it does not matter). Without providing verification data, we do not guarantee that the task will be considered. If you are using a mock server, do not forget to add information about how to run it to the file README.md at the root of the project

3) The table should be sorted by all fields except the date.

Filtering should be in the form of two drop-down lists and a text field:

- Selection of the column to filter by
- Condition selection (equal to, contains, greater than, less than)
- Field for entering values for filtering

4) The table must contain pagination

5) The whole table should work reactively, without reloading the page.

6) Sorting, filtering, page calculation for pagination are carried out on the client side (and not by a request to a remote server, if the data is taken from there)

✅ Can be used:

- native JS, Vue and Node.JS
- Axios
- CSS libraries

❌ Cannot be used:

- Libraries with ready-made components or plugins for Vue that provide ready-made functionality required in the task.
- Libraries and plugins for validation.
- CMS systems.

Evaluation criteria:

- Names of variables
- Adequacy of the application architecture
- Optimization of the application and its scalability
- Security

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
