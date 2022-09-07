#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const { _path } = require('../lib/util');
const { tpls } = require('../config');
const package = require('../package.json');

program
  .version(package.version, '-v, --version')
  .usage('<command> [options]');

program
  .command('init')
  .description('创建新项目')
  .action((source, destination) => {
    if (!destination.args[0]) {
      console.log(chalk.red('请输入项目名称，用于生成对应的目录'));
      return;
    } else {
      const dirName = destination.args[0];
      const dir = _path(dirName);
      if (fs.existsSync(dir)) {
        console.log(chalk.red(`该目录-${dirName}已经存在，请选择别的目录`));
      } else {
        inquirer
          .prompt({
            type: 'list',
            message: '请选择模板',
            name: 'framework',
            choices: Object.keys(tpls),
            default: 'broker 后台模板'
          })
          .then((msg) => {
            console.log(chalk.green('---->>开始创建项目！'));
            shelljs.mkdir(dirName);
            try {
              fs.copySync(path.join(__dirname, '../' ,tpls[msg.framework]), dirName);
              console.log(chalk.green('---->>创建项目成功！'));
              console.log('');
              console.log(`cd ${dirName}`);
              console.log(`npm install`);
              console.log(`npm run start:dev`);
            } catch (error) {
              console.log(error);
              console.log(chalk.red('---->>创建项目失败！'));
            }
          });
      }
    }
  });

program
  .command('lint')
  .description('测试项目');

program
  .command('serve')
  .description('运行dev环境项目')
  .action(() => {
    require('../webpack/start.js');
  });

program
  .command('build')
  .description('打包项目')
  .action(() => {
    require('../webpack/build.js');
  });

program
  .command('deploy')
  .description('上传项目')
  .action(() => {
    require('../lib/deploy.js.js');
  });


program.parse(process.argv);