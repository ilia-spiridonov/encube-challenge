import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import typescript from 'typescript-eslint';

export default [
  // typescript-eslint
  ...typescript.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        { allowNullableObject: false, allowNumber: false, allowString: false },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { requireDefaultForNonUnion: true },
      ],
    },
  },

  // eslint-plugin-prettier
  prettierRecommended,

  // eslint-plugin-perfectionist
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-classes': 'error',
      'perfectionist/sort-interfaces': 'error',
      'perfectionist/sort-jsx-props': 'error',
      'perfectionist/sort-object-types': 'error',
      'perfectionist/sort-objects': 'error',
    },
  },

  // eslint-plugin-simple-import-sort
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },

  // eslint-plugin-react-hooks
  reactHooks.configs.flat['recommended'],

  // built-in rules
  {
    rules: {
      curly: 'error',
      eqeqeq: ['error', 'always', { null: 'never' }],
      'no-console': 'error',
    },
  },
];
