module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'vue/no-use-v-if-with-v-for': 0,
    'vue/no-parsing-error': 0,
    'prettier/prettier': 'on',
    'no-empty': 2, //块语句中的内容不能为空
    jsxBracketSameLine: true,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-spaced-func': 0,
    'no-var': 2,
    'array-bracket-spacing': [0, 'never'],
    // allow async-await
    // allow debugger during development
    'no-callback-literal': 0,
    'vue/html-indent': [
      'error',
      'smart-tab',
      {
        attribute: 1,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/html-self-closing': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 关闭检测函数名称和调用它的左括号之间的空格
    // 'func-call-spacing': 'off',
    // 缩进为2个空格
    indent: ['error', 2],
    // 关闭检测未使用的变量
    'no-unused-vars': 'off',
    // 对象展开时总是要添加逗号，一行时行末不需要逗号
    // 'comma-dangle': ['error', 'always-multiline'],
    // 定义函数时，函数括号之前允许添加空格
    'space-before-function-paren': ['off', 'always'],
    // 关闭禁用无效标签
    'no-tabs': 'off',
    // 关闭空行检测
    'no-multiple-empty-lines': 'off',
    // 关闭模板字符串检测
    'no-template-curly-in-string': 'off',
    'vue/no-unused-components': 0,
    'vue/name-property-casing': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
