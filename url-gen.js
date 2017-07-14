#!/usr/bin/env node
/**
 * Created by WindomZ on 2017/7/9.
 */
'use strict';

const path = require('path');

const prog = require('caporal');

const urlgen = require('./generator').promise;
const init = require('./init');

prog
  .version(require('./package.json').version)
  .argument('[dir]', 'Relative directory path to generate the URL', /^.+$/, '.')
  .option('-u, --up <level>', 'Query <level> parent directory', prog.INT, 0)
  .action((args, options) => {
    let dir = path.resolve(args.dir || process.cwd());
    urlgen(dir, options.up)
      .then(r => {
        console.log(r);
      })
      .catch(e => {
        console.error(e.message);
      });
  });

prog
  .command('init', 'Creates a customization config file')
  .alias('i')
  .action(() => {
    init(process.cwd())
      .then(r => {
        console.log(r);
      })
      .catch(e => {
        console.error(e.message);
      });
  });

prog.parse(process.argv);
