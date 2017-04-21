module.exports = {
    "extends": "airbnb-base",
    parser: 'babel-eslint',
    "plugins": [
        "import"
    ],
    presets: ["flow"],
    "rules": {
      "no-param-reassign": 0,
      "no-shadow": 0,
    },
    "globals": {
        "Blueprint": true
    }
};
