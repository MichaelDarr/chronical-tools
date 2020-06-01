module.exports = {
    "env": {
        "browser": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        },
    },
    "plugins": [
        "react",
        "@typescript-eslint",
    ],
    "rules": {
        "array-bracket-spacing": [
            "error",
            "never",
        ],
        "eol-last": [
            "error",
            "always",
        ],
        "max-len": [
            "error",
            {
                "code": 80,
                "tabWidth": 4,
            }
        ],
        "object-curly-spacing": [
            "error",
            "always",
        ],
        "semi": [
            "error",
            "always",
        ],
        "@typescript-eslint/indent": [
            "error",
            4,
        ],
        "@typescript-eslint/quotes": [
            "error",
            "single",
        ],
    },
    "settings": {
        "react": {
            "version": "detect",
        }
    }
};
