#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const inquirer = require('inquirer')

program.usage('[project-name]')
program.parse(process.argv)

// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()
const projectName = program.args[0]

// 自定义交互式命令行的问题及简单的校验
const question = [
  {
    name: 'templateName',
    type: 'list',
    message: '请选择下载的模板',
    choices: ['el-admin基础版', 'el-admin业务版']
  }
]

inquirer.prompt(question).then(answers => {
  const { templateName } = answers
  downloadTemplate(templateName)
})

const downloadTemplate = (templateName) => {
  const url = 'cl-nagisa/rd-cli'
  console.log(chalk.white('模板下载中...'))
  const spinner = ora('Downloading...');
  spinner.start();
  download(url, projectName, err => {
    if (err) {
      spinner.fail()
      console.log(chalk.red(`下载失败 ${err}`))
      return
    }
    spinner.succeed()
    console.log(chalk.green('下载完成'))
  })
}
