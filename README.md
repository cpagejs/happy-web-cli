
## CLI 使用说明
一个轻量级的CLI脚手架，配置非常简单，已经内置了单页面、多页面模板，可以直接使用，目前已经内置多语言插件。相对于其他cli，更加适合团队协作开发。
安装
```js
npm i -g happy-web-cli
```

生成项目
```js
happy-web-cli init xxx

可以选择不同的模版；目前react相关的模板都已经支持多语言，并且对路由进行了封装。
```

也可以使用 ```npx happy-web-cli init xxx```来直接生成项目

生成项目的配置文件都在 sysConfig.js 中，这样相对于多个env配置文件会很方便。

## sysConfig 配置说明

| 参数 | 说明 | 
| :-----| :---- | 
| isMpa | 是否是多页面应用 |
| port | 端口 |
| host | 域名 |
| proxyConfig | 接口请求代理 |
| openBrower | 启动后是否打开浏览器，默认否 |
| routes | 多页面配置 |
| alias | 自定义配置alias，类型为对象，{ xx: './src/xx' }; 不需要写{'@':'./src'}, 默认已经包含了 | 
| https | 是否开启https模式 | 
| output | output自定义配置 | 
