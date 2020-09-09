# ESLint 和 StyleLint

## ESLint

1.  電腦的全域中安裝 `eslint` 套件

    ```bash
    npm i eslint -g
    ```

1.  初始化 eslint 設定

    ```bash
    eslint --init
    ```

1.  可以選擇由 `JavaScript`，`YAML` 或 `JSON` 格式作為 eslint 的設定檔，這邊以 `JavaScript` 作為範例

    ```js
    module.exports = {
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
      extends: 'eslint:recommended',
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
      plugins: ['html'],
      rules: {
        indent: ['error', 2],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
      },
    };
    ```

1.  VSCode 的 Workspace Settings 中新增下方設定

    ```json
    {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "eslint.validate": ["javascript", "html"]
    }
    ```

## StyleLint

> 可以參考 [官方的安裝步驟](https://stylelint.io/user-guide/get-started)。

:::tip 提醒

如果專案中需使用 SCSS，可以新增 [stylelint-config-sass-guidelines](https://github.com/bjankord/stylelint-config-sass-guidelines) 作為管理。

並將 `.stylelintrc.json` 中的 `extends` 屬性改為：

```json
{
  "extends": "stylelint-config-sass-guidelines"
}
```

:::

在 VSCode 的 Workspace Settings 中新增下方設定：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

## Prettier 的並用

1. 安裝 VSCode 的 Prettier 套件

1. VSCode 的 User Settings 中新增下方設定

   只針對 `html` 和 `markdown` 檔案在做儲存的時後會自動的排版。

   ```json
   {
     "prettier.singleQuote": true,
     "[html]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode",
       "editor.formatOnSave": true
     },
     "[markdown]": {
       "editor.quickSuggestions": true,
       "editor.formatOnSave": true,
       "editor.defaultFormatter": "esbenp.prettier-vscode"
     }
   }
   ```
