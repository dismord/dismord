#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

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
  let sleep = (t = 2500) => new Promise((r) => setTimeout(r, t));
  try {
    res = await inquirer.prompt([
      {
        name: 'NAME',
        type: 'input',
        message: `== ${chalk.hex('#').bgHex('#FADE49')(' NAME ')} ==`,
      },
      {
        name: 'VERSION',
        type: 'list',
        message: `== ${chalk.hex('#').bgHex('#F55D57')(' VERSION ')} ==`,
        choices: [
          { name: `${chalk.hex('#').bgHex('#5865F2')(' 14.4.0 ')}`, value: '14.4.0' },
          { name: `${chalk.hex('#').bgHex('#379C6F')(' 13.6.0 ')}`, value: '13.6.0' },
          { name: `${chalk.hex('#').bgHex('#777777')(' 12.5.3 ')}`, value: '12.5.3' },
        ],
      default: '13.6.0'
      }
    ]);
    if(!res.NAME) res.NAME = 'bot';
    let regex = /^[\d|a-zA-Z-_.]+$/;
    if(!regex.test(res.NAME)) return console.log('\n', chalk.hex('#').bgHex('#F55D57').bold(' ERROR '), chalk.hex('#555555')('INVALID PROJECT NAME'), '\n'), process.exit(1);
    if(res.VERSION == '12.5.3') return console.log('\n', chalk.hex('#').bgHex('#F55D57').bold(' ERROR '), chalk.hex('#555555')('REJECT THE ORIGINAL REQUEST'), '\n'), process.exit(1);
  } catch(err) {
    return console.log('\n', chalk.hex('#').bgHex('#F55D57').bold(' ERROR '), chalk.hex('#555555')('PLEASE TRY AGAIN'), '\n'), process.exit(1);
  };
  const spinner = createSpinner(chalk.hex('').bgHex('#777777').bold(' CREATING PROJECT '));
  try {
    const { NAME, VERSION } = res;
    const cwd = process.cwd();
    const root = path.join(cwd, NAME);
    if(!fs.existsSync(root)) fs.mkdirSync(root, { recursive: true });
    else return console.log('\n', chalk.hex('#').bgHex('#F55D57').bold(' ERROR '), chalk.hex('#555555')('THIS FOLDER ALREADY EXISTS'), '\n'), process.exit(1);
    const rename = { _gitignore: ".gitignore" };
    const mod = path.resolve(fileURLToPath(import.meta.url), '../', `${VERSION}.mod`);
    const write = (file, cnt) => {
      const target = path.join(root, rename[file] ?? file);
      if(cnt) fs.writeFileSync(target, cnt);
      else copy(path.join(mod, file), target);
    };
    const files = fs.readdirSync(mod);
    for(let file of files) write(file);
    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, NAME, 'package.json'), 'UTF-8'));
    pkg.name = NAME;
    write('package.json', JSON.stringify(pkg, null, 2));
    console.log();
    spinner.start();
    await sleep();
    spinner.success({ text: `${chalk.hex('#').bgHex('#379C6F').bold(' SUCCESS ')} ${chalk.hex('#555555')('CREATED THE PROJECT SUCCESSFULLY')}\n` });
    await console.log('\n',
    chalk.hex('#').bgHex('#FADE49').bold(' TIP '),chalk.hex('#555555')(`USE ${chalk.hex('#').bgHex('#DDDDDD')(` cd ./${NAME} `)} TO CHANGE THE PATH TO YOUR PROJECT`), '\n',
    chalk.hex('#').bgHex('#FADE49').bold(' TIP '), chalk.hex('#555555')(`USE ${chalk.hex('#').bgHex('#DDDDDD')(' npm install ')} TO INSTALL THE PACKAGES YOUR PROJECT NEEDS`), '\n',
    chalk.hex('#').bgHex('#FADE49').bold(' TIP '), chalk.hex('#555555')(`ENTER BOT ${chalk.hex('#').bgHex('#DDDDDD')(' ID ')} AND ${chalk.hex('#').bgHex('#DDDDDD')(' TOKEN ')} IN ${chalk.hex('#').bgHex('#DDDDDD')(' .env ')} FILE`), '\n',
    chalk.hex('#').bgHex('#FADE49').bold(' TIP '), chalk.hex('#555555')(`USE ${chalk.hex('#').bgHex('#DDDDDD')(' npm run bot ')} TO RUN YOUR BOT`),
    '\n');
  } catch(err) {
    console.log();
    spinner.start();
    await sleep();
    spinner.error({ text: `${chalk.hex('#').bgHex('#F55D57').bold(' ERROR ')} ${chalk.hex('#555555')('PLEASE TRY AGAIN')}\n` });
    process.exit(1);
  };
};

main().catch((err) => console.error(err));