/**
 * Created by WindomZ on 17-7-11.
 */
'use strict';

const path = require('path');

const test = require('ava');

const gen = require('../generator');

test('generator pass', t => {
  try {
    t.is(
      gen(path.join(path.dirname(__dirname), 'examples')),
      'http://127.0.0.1:8888/example'
    );
    t.pass();
  } catch (e) {
    t.fail(e);
  }
});
