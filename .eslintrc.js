module.exports = {
    env: {
        es2021: true,
        node: true,
        jest: true,
        commonjs: true,
    },
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        project: 'tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['.eslintrc.js'], // !!! new and important part !!!
    plugins: ['@typescript-eslint'],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', ignoreRestSiblings: true },
        ],
        'no-console': 1,
        '@typescript-eslint/no-var-requires': 0,
    },
};
