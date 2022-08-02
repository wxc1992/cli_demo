const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/ajax/", { // api是自定义的，用的时候也要对应写api
      target: 'https://demotest.i.wxblockchain.com/ajax/', // 本地请求的地址
      changeOrigin: true,
      pathRewrite: {
        "^/ajax": ""
      },
      // "secure": false,
    })
  );
  app.use(
    createProxyMiddleware("/api/v1", { // api是自定义的，用的时候也要对应写api
      target: 'https://demo.i.wxblockchain.com/api/', // 请求的地址
     changeOrigin: true,
     pathRewrite: {
       "^/api": ""
     }
   })
  )
 
}
