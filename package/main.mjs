#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

const success = (str) => `${chalk.bgHex('#379C6F').bold(' SUCCESS ')} ${chalk.hex('#555555')(str)}\n`;
const error = (str) => `${chalk.bgHex('#F55D57').bold(' ERROR ')} ${chalk.hex('#555555')(str)}\n`;
const tip = (str) => `${chalk.bgHex('#FADE49').bold(' TIP ')} ${chalk.hex('#555555')(str)}\n`;
const tiphl = (str) => `${chalk.bgHex('#DDDDDD')(str)}`;

function copy(src, dest) {
  const stat = fs.statSync(src);
  if(stat.isDirectory()) copydir(src, dest);
  else fs.copyFileSync(src, dest);
};

function copydir(srcdir, destdir) {
  fs.mkdirSync(destdir, { recursive: true });
  for(let file of fs.readdirSync(srcdir)) {
    const srcfile = path.resolve(srcdir, file);
    const destfile = path.resolve(destdir, file);
    copy(srcfile, destfile);
  };
};

async function main() {
  let res;
  try {
    res = await inquirer.prompt([
      {
        name: 'NAME',
        type: 'input',
        message: `== ${chalk.bgHex('#3996FF')(' NAME ')} ==`
      },
      {
        name: 'VERSION',
        type: 'list',
        message: `== ${chalk.bgHex('#F55D57')(' VERSION ')} ==`,
        choices: [
           { name: `${chalk.bgHex('#5865F2')(' 14.4.0 ')}`, value: '14.4.0' },
          { name: `${chalk.bgHex('#379C6F')(' 13.6.0 ')}`, value: '13.6.0' }
        ],
        default: '13.6.0'
      }
    ]);
    if(!res.NAME) res.NAME = 'bot';
    if(!/^[\d|a-zA-Z-_.]+$/.test(res.NAME)) return console.log('\n', error('INVALID PROJECT NAME')), process.exit(1);
  } catch(err) {
    return console.log('\n', error('PLEASE TRY AGAIN')), process.exit(1);
  };
  const spinner = createSpinner(chalk.hex('').bgHex('#777777').bold(' CREATING PROJECT '));
  const sleep = (t) => new Promise((r) => setTimeout(r, t));
  try {
    const { NAME, VERSION } = res;
    const cwd = process.cwd();
    const root = path.join(cwd, NAME);
    if(!fs.existsSync(root)) fs.mkdirSync(root, { recursive: true });
    else return console.log('\n', error('THIS FOLDER ALREADY EXISTS')), process.exit(1);
    const mod = path.resolve(fileURLToPath(import.meta.url), '../', `${VERSION}.mod`);
    fs.copySync(mod, root);
    fs.renameSync(path.join(root, '_gitignore'), path.join(root, '.gitignore'));
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'UTF-8'));
    pkg.name = NAME;
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(pkg, null, 2));
    console.log();
    spinner.start(), await sleep(2500);
    spinner.success({ text: success('CREATED THE PROJECT SUCCESSFULLY') });
    console.log(
    tip(`USE ${tiphl(` cd ./${NAME} `)} TO CHANGE THE PATH TO YOUR PROJECT`) + tip(`USE ${tiphl(' npm install ')} TO INSTALL THE PACKAGES YOUR PROJECT NEEDS`) + tip(`ENTER BOT ${tiphl(' ID ')} AND ${tiphl(' TOKEN ')} IN ${tiphl(' .env ')} FILE`) + tip(`USE ${tiphl(' npm run bot ')} TO RUN YOUR BOT`), '\n');
  } catch(err) {
    console.log();
    spinner.start(), await sleep(1500);
    spinner.error({ text: error('PLEASE TRY AGAIN') }), process.exit(1);
  };
};

main().catch((err) => console.error(err));