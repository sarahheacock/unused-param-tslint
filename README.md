## Overview
This enables the use of a leading underscore in a variable but only if...
- the variable is a parameter
- and the parameter is unused.

## How to use
install lint dependency
```sh
npm install --save-dev https://github.com/sarahheacock/unused-param-tslint.git
```

add dependency to rules directory of tslint
```javascript
// tslint.json
{
    "extends": [],
    "jsRules": {},
    "rules": {
        "format-unused-params": true,
        "variable-name": [
            true,
            "allow-leading-underscore",
            ...
        ],
    },
    "linterOptions": {
        "exclude": [
            "node_modules"
        ]
    },
    "rulesDirectory": [
        "./node-modules/unused-params-tslint/dist"
    ]
}
```