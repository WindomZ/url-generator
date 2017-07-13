#!/usr/bin/env node
/**
 * Created by WindomZ on 2017/7/9.
 */
'use strict';

const path = require('path');

const prog = require('caporal');

const urlgen = require('./generator').promise;

prog
  .version(require('./package.json').version)
  .argument('[dir]', 'Relative directory path to generate the URL', /^.+$/, '.')
  .option('-u, --up <level>', 'Query <level> parent directory', prog.INT, 0)
  .action(function(args, options) {
    let dir = path.resolve(args.dir || process.cwd());
    urlgen(dir, options.up)
      .then(r => {
        console.log(r);
      })
      .catch(e => {
        console.error(e.message);
      });
  });

prog.parse(process.argv);
