#!/usr/bin/env node
/**
 * Created by WindomZ on 2017/7/9.
 */
'use strict';

const os = require('os');
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
        process.stdout.write(r + os.EOL);
      })
      .catch(e => {
        console.error(e.message);
      });
  });

prog
  .command('init', 'Creates a customization .url-gen.yml file')
  .alias('i')
  .action(() => {
    init(process.cwd())
      .then(r => {
        process.stdout.write(
          '.url-gen.yml ' + (r ? 'creates success!' : 'exists!') + os.EOL
        );
      })
      .catch(e => {
        console.error(e.message);
      });
  });

prog.parse(process.argv);
