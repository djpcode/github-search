# Simple Github Search App

This is a simple React based app for searching Github via the official API.

This project uses [Vite](https://vite.dev/), [Tailwind CSS](https://tailwindcss.com/) (with CSS variables) and [Shadcn UI](https://ui.shadcn.com/) Components.  
Requests to the Github API are handled via Github's Octokit REST client, [@octokit/rest](https://www.npmjs.com/package/@octokit/rest)
and [SWR](https://swr.vercel.app/) for caching and request management.

## Getting Set Up

To get the app up and running, simply git clone the repository:
```sh
git clone ...
cd ...
```

Then install dependencies and start the server:
```sh
npm install
npm run dev
```

## TODO

- [ ] Add tests
- [x] Reduce code duplication
- [x] Use SWR to wrap Octokit rest client for better request handling
- [ ] Add more search options
- [ ] Improve theme and styling
- [ ] Stricter lint rules


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
