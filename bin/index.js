#!/usr/bin/env node
console.log('cli ......')
const program = require('commander');
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
program.version(require('../package.json').version)
program
    .command("list") //查看拥有的模板
    .description("查看所有可用模板")
    .action(() => {
        for (const key in templates) {
            // 输出每个模板的模板名和模板描述
            console.log(key, templates[key].description);
        }
    })
program
.command('init <template> <name>')
.description('init project')
.action(require('../lib/init'))
program.parse(process.argv)

