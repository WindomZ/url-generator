/**
 * Created by WindomZ on 17-7-14.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const co = require('co');
const yaml = require('js-yaml');
const inquirer = require('inquirer');

function* init(dir) {
  let filePath = path.join(dir, '.url-gen.yml');

  try {
    fs.accessSync(filePath, fs.F_OK);
    return false;
  } catch (e) {}

  let obj = {
    version: '1.0',
    root: '',
    path: path.basename(dir),
  };

  let input = yield inquirer.prompt([
    {
      type: 'input',
      name: 'root',
      message: 'Please enter the url root path:',
      default: 'No',
    },
  ]);
  if (input.root === 'No') {
    delete obj.root;
  } else {
    obj.root = input.root.trim();
  }

  input = yield inquirer.prompt([
    {
      type: 'input',
      name: 'path',
      message: 'Please enter the url path of the current directory:',
      default: 'Default',
    },
  ]);
  if (input.path !== 'Default') {
    obj.path = input.path.trim();
  }

  fs.writeFileSync(filePath, yaml.safeDump(obj), 'utf8');

  return true;
}

module.exports = dir => co.wrap(init)(dir);
