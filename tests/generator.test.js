/**
 * Created by WindomZ on 17-7-11.
 */
'use strict';

const path = require('path');

const test = require('ava');

const gen = require('../generator');

test('generator example pass', t => {
  try {
    t.is(
      gen(path.join(path.dirname(__dirname), 'examples')),
      'http://127.0.0.1:888/example'
    );
    t.pass();
  } catch (e) {
    t.fail(e);
  }
});

test('generator multi-level pass', t => {
  try {
    t.is(
      gen(path.join(path.dirname(__dirname), 'examples', 'multi')),
      'http://127.0.0.1:8888/m'
    );
    t.pass();
  } catch (e) {
    t.fail(e);
  }

  try {
    t.is(
      gen(path.join(path.dirname(__dirname), 'examples', 'multi', 'level')),
      'http://127.0.0.1:8888/m/lv'
    );
    t.pass();
  } catch (e) {
    t.fail(e);
  }

  try {
    t.is(
      gen(
        path.join(
          path.dirname(__dirname),
          'examples',
          'multi',
          'level',
          'nesting'
        )
      ),
      'http://127.0.0.1:8888/m/lv/nesting'
    );
    t.pass();
  } catch (e) {
    t.fail(e);
  }

  try {
    t.is(
      gen(
        path.join(
          path.dirname(__dirname),
          'examples',
          'multi',
          'level',
          'nesting'
        ),
        2
      ),
      'http://127.0.0.1/lv/nesting'
    );
    t.pass();
  } catch (e) {
    t.fail(e);
  }
});

test('generator promise pass', async t => {
  await gen
    .promise(
      path.join(
        path.dirname(__dirname),
        'examples',
        'multi',
        'level',
        'nesting'
      )
    )
    .then(r => {
      t.is(r, 'http://127.0.0.1:8888/m/lv/nesting');
    })
    .catch(e => {
      t.fail(e);
    });

  await gen
    .promise(
      path.join(
        path.dirname(__dirname),
        'examples',
        'multi',
        'level',
        'nesting'
      ),
      2
    )
    .then(r => {
      t.is(r, 'http://127.0.0.1/lv/nesting');
      t.pass();
    })
    .catch(e => {
      t.fail(e);
    });
});
