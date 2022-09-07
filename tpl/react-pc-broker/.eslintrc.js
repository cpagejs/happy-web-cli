module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 添加`prettier`拓展 用于和`prettier`冲突时覆盖`eslint`规则
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  "globals": {
		"NODE_ENV": true,
	},
  rules: {
    "no-unused-vars": 0,
		"react/jsx-no-undef": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "no-unused-vars": 0,
    "react/no-children-prop": 0,
    "no-unreachable": 0,
  },
}
