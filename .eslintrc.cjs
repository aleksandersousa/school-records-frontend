module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  // files: ['*.ts', '*.tsx'], // Your TypeScript files extension
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'unused-imports', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx']
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-no-duplicate-props': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'global-require': 'off',
    'space-defore-function-paren': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'import/no-unresolved': 'error',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-alert': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    radix: 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
  },
  settings: {
    'import/resolver': {
      'typescript': {},
      // 'node': {
      //   'extensions': ['.js','.jsx','.ts','.tsx']
      // }
    }
  }
}
