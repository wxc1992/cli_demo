const {promisify} = require('util')
const figlet = promisify(require('figlet'))
const Prompt = require("inquirer");
const clear = require('clear')
const chalk = require('chalk')
chalk.level = 1
const log = content => console.log(chalk.green(content))
const {clone} = require('./download')
const templates = {
    // 模板tpl-a: 模板a的地址
    "tpl-a": {
        url: "github:wxc1992/vue-cli-webpack-element-ui",
        description: "Vue模板"
    },
    "tpl-b": {
        url: "github:wxc1992/reactproject",
        description: "React模板"
    },
}
const initQuestions = name => [
    {
      type: "confirm",
      name: "isInit",
      message: `确定要在${chalk.green(name)}文件夹下创建项目?`,
      prefix: "?"
    }
  ];
module.exports = async (template,name) =>{
    //打印欢迎界面
    clear()
    try {
        const { isInit } = await Prompt.prompt(initQuestions(name));
        if (isInit) {
            const data = await figlet('MYCLI WLECOME')
            log(data)
            log('👀👀创建项目 '+ template + name)
            await clone(templates[template].url,name)
        } else {
          console.log(chalk.red("程序提前结束"));
        }
      } catch (error) {
        console.log(chalk.red(error));
      }
   
}