module.exports = {
  ...require("@shopify/prettier-config"),
  "quoteProps": "consistent",
  "overrides": [
    {
      "files": [
        ".babelrc",
        ".eslintrc",
        ".stylelintrc",
        ".prettierrc",
        ".lintstagedrc",
        ".huskyrc",
        ".renovaterc"
      ],
      "options": {
        "parser": "json"
      }
    }
  ]
};
