module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-essential',
        'plugin:prettier/recommended'
    ],
    overrides: [
        {
            env: {
                es6: true,
                node: true,
                jest: true,
                browser: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: '2019',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
    },
    plugins: ['@typescript-eslint', 'vue'],
    rules: {}
}
