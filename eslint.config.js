import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import universe from 'eslint-config-universe';
import prettier from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
            prettier: prettier,
        },
        rules: {
            'prettier/prettier': 0,
            'import/order': 0,
            'react-native/no-inline-styles': 0,
            'import/namespace': 0,
            'no-duplicate-imports': 'error',
            '@typescript-eslint/ban-types': 'error',
        },
    },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    {
        ignores: ['node_modules/**', 'dist/**', 'lib/**', '.expo/**', '**/*.d.ts'],
    },
];
