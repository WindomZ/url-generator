/**
 * Created by WindomZ on 17-7-14.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const co = require('co');
const yaml = require('js-yaml');
const inquirer = require('inquirer');

function* init(dir, input = true) {
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

  let answer = input
    ? yield inquirer.prompt([
        {
          type: 'input',
          name: 'root',
          message: 'Please enter the url root path:',
          default: 'No',
        },
      ])
    : { root: 'No' };
  if (answer.root === 'No') {
    delete obj.root;
  } else {
    obj.root = answer.root.trim();
  }

  answer = input
    ? yield inquirer.prompt([
        {
          type: 'input',
          name: 'path',
          message: 'Please enter the url path of the current directory:',
          default: 'Default',
        },
      ])
    : { path: 'Default' };
  if (answer.path !== 'Default') {
    obj.path = answer.path.trim();
  }

  fs.writeFileSync(filePath, yaml.safeDump(obj), 'utf8');

  return true;
}

module.exports = (dir, input) => co.wrap(init)(dir, input);
