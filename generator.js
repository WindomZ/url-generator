/**
 * Created by WindomZ on 17-7-11.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const co = require('co');
const yaml = require('js-yaml');
const urljoin = require('url-join');

function dirWalk(dir, depth = 0) {
  let dirs = [];
  let tmp = dir;
  let index = 0;
  while (dir) {
    dirs.push(dir);
    dir = path.dirname(dir);
    if (!dir || dir === tmp) break;
    tmp = dir;
    if (depth > 0 && ++index >= depth) break;
  }
  return dirs.reverse();
}

function fileWalk(dir, regexp) {
  let list = [];
  let files = fs.readdirSync(dir);
  files.forEach(file => {
    let filePath = path.join(dir, file);
    if (!fs.lstatSync(filePath).isDirectory()) {
      if (!regexp || file.match(regexp)) {
        list.push(filePath);
      }
    }
  });

  return list;
}

/**
 * Generates URL address based on the directory.
 *
 * @param {string} dir
 * @param {int} [depth]
 * @return {string}
 * @api public
 */
function urlGenerate(dir, depth = 0) {
  let result = { root: 'http://127.0.0.1', paths: [] };
  let dirs = dirWalk(dir, depth);
  dirs.forEach(d => {
    let files = fileWalk(d, /^\.url-gen(\.(yml|yaml))?$/);
    if (files.length === 0) {
      result.paths.push(path.basename(d));
      return;
    }
    files.forEach(file => {
      let doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'), 'utf8');
      doc.version = doc.version || '';
      switch (doc.version) {
        default:
          if (doc.root) {
            result.root = doc.root;
            result.paths = [];
          }
          result.paths.push(doc.path || path.basename(path.dirname(file)));
          break;
      }
    });
  });
  return urljoin(result.root, ...result.paths);
}

module.exports = urlGenerate;

module.exports.promise = (dir, depth) => co.wrap(urlGenerate)(dir, depth);
