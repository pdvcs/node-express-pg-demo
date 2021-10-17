#!/bin/bash
find . -type f -name "*.js" ! -path "./node_modules/*" ! -path "./git/*" ! -path "./bin/*" \
    -exec js-beautify -r {} \;
