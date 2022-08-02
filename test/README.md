# frontend


    
**项目主要技术栈**
```
react@16.8.6 + antd@4.7.0 + umi@3.2.14
```
**项目地址**
```
git@github.com:wxc1992/mui-WebApp.git
```
**项目运行**
```


cd frontend (进入项目)

yarn 或者 npm install (安装依赖包)

yarn start 或者 npm start (启动服务)
```

**项目打包**
```
yarn build 或者 npm run build
```

**目录说明**
```
|——config/                          // 项目配置文件目录
    |——webpack.config.js            // 打包配置 webpack配置
    |——webpackDevServer.config.js   // 打包配置 dev 环境 webpackDevServer.config.js     
    |——env.js                       // 环境相关信息
|——dist/                            // 默认的build输出目录
|——scripts/                         // 打包相操作
|——public/                          // 静态文件目录
|——src/                             // 源码目录
    |——action/                      // saga相关的操作
    |——components/                  // 公用组件目录 
    |——css/                         // 样式文件
    |——plugins/                     // axios 等插件封装
    |——routes/                      // 路由
    |——pages/                       // 页面文件目录
    |——service/                     // 公用请求目录
    |——utils/                       // 工具目录
    |——static/                      // 静态文件
|——App.js                           // 页面总入口
|——main.js                          // 路由引入目录
|——index.js                         // 整个项目的所有文件引入
|——setupProxy.js                    // dev环境代理
```