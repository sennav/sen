# SEN - Stream Editor for N00bs (or Normal people)

SEN is a simple stream editor with limited features.
It was designed to work with other tools through UNIX pipes.
Ex find, grep, rp, xargs, etc.

Right now there are only four operations:

* Replace matching pattern.
* Add a line to a specific line number.
* Remove line matching pattern.
* Remove lines by number.

## Install

Sen is installed via [npm](npmjs.com):

```
npm install -g sen-cli

```

## Usage

```
Usage: sen [options] [command]


Options:

-V, --version  output the version number
-h, --help     output usage information


Commands:

replace <toReplace> <replacer> <file>  Replace pattern throughout the stream.
add <lines> <lineToAdd> <file>         Add line at given positions (int comma separated).
remove <pattern> <file>                Remove lines matching pattern.
removelines <lines> <file>             Remove lines at given positions (int comma separated).
help [cmd]                             display help for [cmd]

```

## Examples

Replace:

```
sen replace 'import.*Package' 'import NewPackage' filename.py filename2.py

```
It can be used with file arguments.


Add:

```
cat filename.py | sen add '# My awesome comment' 1

```
It can be used with stdin.

Remove:

```
find . | xargs sen remove -i .bak '# My awesome comment'

```

`-i` can be used to generate backup files.

Remove lines:

```
sen removelines -i 1,2,3 ~/.ssh/known_hosts

```

`-i` without arguments edits the file in place.



