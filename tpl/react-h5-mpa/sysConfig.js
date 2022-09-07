const env = process.env.NODE_ENV;

const apiEnv = {
	dev: {
		apiConfig: {
			target: "http://www.xxx.com/",
			changeOrigin: true,
			https: true,
			headers: {
				Referer: "http://www.xxx.com/",
			},
			cookieDomainRewrite: "",
		},
	},
	test: {
		apiConfig: {
			target: "http://www.xxx.com/",
			changeOrigin: true,
			https: true,
			headers: {
				Referer: "http://www.xxx.com/",
			},
			cookieDomainRewrite: "",
		},
	},
};

const proxy = {
	"/api": apiEnv[env].apiConfig,
};

const routes = [
	{
		name: 'demo', // 页面名称，必须填写
		js: './src/pages/demo/index.js',
		html: './src/pages/demo/index.html',
		txt: 'demo页面'
	},
];

module.exports = {
	isMpa: true, // 是否是多页面应用
	port: '3030',
	host: '0.0.0.0',
	proxyConfig: proxy,
	openBrower: false, // 启动后是否打开浏览器
	routes,
};