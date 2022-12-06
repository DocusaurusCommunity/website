module.exports = {
  env: {
    browser: true,
    commonjs: true,
    jest: true,
    node: true,
  },
  globals: {
    JSX: true,
  },
  extends: [
    'plugin:mdx/recommended',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:@docusaurus/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'react', '@docusaurus'],
  rules: {},
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
