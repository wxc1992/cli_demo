const {promisify} = require('util')
// 进度显示工具
const ora = require("ora");

// 颜色显示工具
const chalk = require("chalk");

// 下载git 仓库代码工具
const download = promisify(require("download-git-repo"));
const log = content => console.log(chalk.green(content))
module.exports.clone = async function(repo, desc){
    const process = ora(`开始下载 ${chalk.blue(repo)}`);
    process.start();
    process.color = "yellow";
    process.text = `正在下载..... ${chalk.yellow(repo)} `;

    // await download(repo,desc)
   
    
    try {
        await download(repo, desc);
        process.color = "green";
        process.text = `下载成功 ${chalk.green(repo)} `;
        process.succeed('project is success download, rplease run it with "`yarn` or `npm install`" at the project')
      } catch (error) {
        log(error)
        process.color = "red";
        process.text = "下载失败";
        process.fail();
      }
}