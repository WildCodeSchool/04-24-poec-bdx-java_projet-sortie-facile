#!/bin/bash

sass --update ./src/assets/theme/scss/dark/theme.scss:./src/assets/theme/css/dark/theme.css
echo "dark theme compiled with success 👍"
echo ""

sass --update ./src/assets/theme/scss/light/theme.scss:./src/assets/theme/css/light/theme.css
echo "light theme compiled with success 👍"
echo ""

cp -r src/assets/theme/scss/fonts/ src/assets/theme/css/fonts/
echo "font copied 👍"
echo ""

printf '\033[1;32;40m'
echo -e "Congratulations, the compilation of the theme has been successfully completed 🎉"
printf '\033[0m'