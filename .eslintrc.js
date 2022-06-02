module.exports = {
    env: { browser: true, es6: true, node: true },
    extends: ['plugin:prettier/recommended'],
    // Exclude "node_modules", "dist"; include ".prettierrc.js"
    ignorePatterns: ['!.prettierrc.js', 'dist', 'node_modules', 'frontend/.storybook/assets'],
    overrides: [
        {
            env: {
                es6: true,
                node: true,
            },
            extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier'],
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
            },
            plugins: ['babel', 'import', 'node', 'prettier', 'react', 'simple-import-sort'],
            rules: {
                '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-member-accessibility': 'off',
                '@typescript-eslint/no-explicit-any': 'error',
                '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
                '@typescript-eslint/prefer-interface': 'off',
                'import/no-cycle': ['error', { ignoreExternal: true }],
                'no-console': ['error', { allow: ['warn', 'error'] }],
                'node/no-process-env': 'error',
                'prettier/prettier': 'error',
                'react/jsx-sort-props': 'error',
                'simple-import-sort/exports': 'error',
                'simple-import-sort/imports': 'error',
                'sort-imports': 'off',
                'sort-keys': 'off',
            },
            settings: {
                'import/parsers': {
                    '@typescript-eslint/parser': ['.ts', '.tsx'],
                },
                'import/resolver': {
                    // use <root>/tsconfig.json
                    typescript: {
                        alwaysTryTypes: true, // always try to resolve types under `<root/>@types` directory even if it doesn't contain any source code, like `@types/unist`
                    },
                },
                react: {
                    version: 'detect',
                },
            },
        },
    ],
    parser: 'babel-eslint',
    plugins: ['json-format'],
    root: true,
    rules: {
        'sort-keys': ['error', 'asc', { natural: true }],
    },
    settings: {
        'json/json-with-comments-files': [],
        'json/sort-package-json': 'standard',
    },
};
