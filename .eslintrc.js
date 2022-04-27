/* cSpell:disable */
module.exports = {
    // lint 環境
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb-base',
    ],
    parserOptions: {
        sourceType: 'module',
    },
    rules: {
        /*
         * 'off' 或 0 - 关闭规则
         * 'warn' 或 1 - 开启规则，使用警告级别的错误：warn
         * 'error' 或 2 - 开启规则，使用错误级别的错误：error
         */
        // FIXME after finding something to instead '@/*'
        'import/no-extraneous-dependencies': 'off',

        // Editor style
        'array-bracket-spacing': ['warn', 'never'],
        'arrow-parens': 'off',
        'block-spacing': 'warn',
        'brace-style': ['warn', 'stroustrup'],
        'comma-dangle': ['warn', 'always-multiline'],
        'comma-spacing': 'warn',
        indent: ['warn', 4, { SwitchCase: 1 }],
        'key-spacing': 'warn',
        'keyword-spacing': 'warn',
        'max-len': ['warn', {
            code: 170,
            tabWidth: 4,
        }],
        'no-multiple-empty-lines': ['warn', {
            max: 2,
            maxBOF: 0,
            maxEOF: 1,
        }],
        'no-multi-spaces': 'warn',
        'no-trailing-spaces': 'warn',
        'object-curly-newline': ['warn', {
            ObjectExpression: { consistent: true },
            ObjectPattern: { multiline: true, minProperties: 4 },
        }],
        'object-curly-spacing': ['warn', 'always'],
        'padded-blocks': ['warn', { classes: 'always' }],
        'padding-line-between-statements': ['warn',
            { blankLine: 'always', prev: 'directive', next: '*' },
            { blankLine: 'always', prev: '*', next: 'cjs-export' },
            { blankLine: 'always', prev: '*', next: 'class' },
            { blankLine: 'always', prev: '*', next: 'function' },
            { blankLine: 'always', prev: '*', next: 'return' },
        ],
        'space-infix-ops': 'warn',
        'space-unary-ops': 'warn',

        // Code style
        // 允許類別內函式沒有調用到自身的屬性或其他函式
        'class-methods-use-this': 'off',
        // 允許匿名函式、閉包
        'func-names': 'off',
        // 全局 require 功能改為 warning，提醒開發者再次確認
        'global-require': 'warn',
        // 參數的 new 操作必須完整描述
        'new-parens': 'error',
        // 允許在 loop 中使用 await，因為操作可能需要依序執行
        'no-await-in-loop': 'off',
        // 保留 continue 使用
        'no-continue': 'off',
        // 禁止在 if、else 之外的判斷條件內使用 returnF
        'no-else-return': 'error',
        // 禁止在不明確的區塊內使用 this
        'no-invalid-this': 'error',
        // 提醒開發者在 else 區塊內單獨只有一個 if，想想是否該改用 else if 取代
        'no-lonely-if': 'warn',
        // 對函式參數重新賦值改為 warning，提醒開發者再次確認
        'no-param-reassign': 'warn',
        // 為了可以使用 ++a / a++
        'no-plusplus': 'off',
        // 禁止在結果只有 true/false 的處理條件使用三元運算子
        'no-unneeded-ternary': 'error',
        // 允許使用三元運算子
        'no-unused-expressions': ['error', {
            allowTernary: true,
        }],
        // 允許提升 functions & classes
        'no-use-before-define': ['error', {
            functions: false,
            classes: false,
        }],
        // 不需要無用的建構式，空的建構式就不需要寫
        'no-useless-constructor': 'error',
        // 禁止使用 var 宣告變數
        'no-var': 'error',
        // 禁止直接回傳一個 await 操作
        'no-return-await': 'error',
        // 如果變數宣告後不曾再次進行賦值操作，則應該宣告為 const
        'prefer-const': 'error',
        // 不使用 array destructuring
        'prefer-destructuring': 'off',
        // 如果有使用到函式定義之外的剩餘參數 (arguments)，必須明確使用 ...args 定義在參數列
        'prefer-rest-params': 'error',
        // 強制使用單引號
        quotes: ['error', 'single'],
        // 允許字串轉換數字時不帶進位基底 (default 十進位)
        radix: 'off',
        // 允許 async 函式內沒有 await 操作
        'require-await': 'off',
        // 語尾一定要加分號
        semi: ['error', 'always'],
    },

    overrides: [
        {
            files: ['test/**/*.js'],
            rules: {
                // 為了方便寫 mock，關閉這條規則
                'global-require': 'off',
            },
        },
    ],
};
