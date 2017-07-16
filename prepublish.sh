#!/bin/bash
node_modules/cli-manpage/bin/manpage sen.js > docs/CLI.md && node_modules/marked-man/bin/marked-man --name sen docs/CLI.md > sen.1
