import pluginVue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**']
  },
  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    languageOptions: {
      parser: vueParser,

      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports
    },

    rules: {
      /* IMPORTS */
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],

      /*VUE*/
      'vue/html-indent': ['error', 2],
      'vue/script-indent': [
        'error',
        2,
        {
          baseIndent: 0
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 2
          },
          multiline: {
            max: 1
          }
        }
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always'
        }
      ],
      'vue/multi-word-component-names': 'off',

      /* GENERAL */
      indent: 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'never']
    }
  },

  prettier
]
