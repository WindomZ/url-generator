/**
 * Created by WindomZ on 17-7-14.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const test = require('ava');

const init = require('../init');

test('init example pass', async t => {
  let dirPath = path.join(path.dirname(__dirname), 'examples');
  await init(dirPath)
    .then(r => {
      t.false(r);
    })
    .catch(e => {
      t.fail(e);
    });

  dirPath = path.join(dirPath, 'init');
  await init(dirPath, false)
    .then(r => {
      t.true(r);
    })
    .catch(e => {
      t.fail(e);
    });

  let filePath = path.join(dirPath, '.url-gen.yml');
  fs.accessSync(filePath);
  fs.unlinkSync(filePath);

  t.pass();
});
