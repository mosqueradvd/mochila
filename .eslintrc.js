module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'standard-jsx',
    'standard-react'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error' // Checks effect dependencies
  }
}
