const env = process.env.NODE_ENV || 'dev';

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

module.exports = {
	isMpa: false,
	host: 'localhost',
	port: '3090',
	proxyConfig: proxy,
	openBrower: true
};