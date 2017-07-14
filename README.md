# url-generator

[![Greenkeeper badge](https://badges.greenkeeper.io/WindomZ/url-generator.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/WindomZ/url-generator.svg?branch=master)](https://travis-ci.org/WindomZ/url-generator)
[![Coverage Status](https://coveralls.io/repos/github/WindomZ/url-generator/badge.svg?branch=master)](https://coveralls.io/github/WindomZ/url-generator?branch=master)
[![Dependency](https://david-dm.org/WindomZ/url-generator.svg)](https://david-dm.org/WindomZ/url-generator)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

> Generates URL address based on the directory.

[![NPM](https://nodei.co/npm/url-gen.png)](https://nodei.co/npm/url-gen/)

[![url-gen](https://img.shields.io/npm/v/url-gen.svg)](https://www.npmjs.com/package/url-gen)
[![status](https://img.shields.io/badge/status-stable-green.svg)](https://www.npmjs.com/package/url-gen)

## Features

- [x] _cli_ - Command line interface.
- [x] _custom_ - Customize `.url-gen.yml` file.

## Install

```bash
npm install -g url-gen
```

## Usage

```bash
$ url-gen -h

   USAGE

     url-gen [dir]
     url-gen init

   ARGUMENTS

     [dir]      Relative directory path to generate the URL      optional      default: "."

   OPTIONS

     -u, --up <level>      Query <level> parent directory      optional      default: 0

   GLOBAL OPTIONS

     -h, --help         Display help                                      
     -V, --version      Display version                                   
     --no-color         Disable colors                                    
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages
```

## Configuration

You need to customize the `.url-gen.yml` file, the rules configured like this: 
```yaml
version: 1.0               # version number, optional
root: http://127.0.0.1:888 # defines the url root path, optional, default: http://127.0.0.1
path: example              # defines the url path of the current directory, optional
```

You can run ``url-gen init`` to help create.

## Example

```bash
url-gen            # working in the local directory.
url-gen examples   # working in the `./examples/` directory.
url-gen ~/examples # working in the `~/examples/` directory.

url-gen i          # creates the `.url-gen.yml` file.
url-gen init       # creates the `.url-gen.yml` file.
```

## Environment

- linux CI pass
- macOS CI pass
- windows Not yet tested

## Contributing

Welcome to pull requests, report bugs, suggest ideas and discuss **url-generator**, 
i would love to hear what you think about **url-generator** on [issues page](https://github.com/WindomZ/url-generator/issues).

If you like it then you can put a :star: on it.

## License

[MIT](https://github.com/WindomZ/url-generator/blob/master/LICENSE)
