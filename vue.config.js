const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    configureWebpack: {

        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'utils':'@/utils',
            }
        },
        devServer: {
            proxy: {
                //名字可以自定义，这里我用的是api
                '/api': {
                    target: 'http://localhost:5000/api',//设置你调用的接口域名和端口号 别忘了加http
                    changeOrigin: true,//这里设置是否跨域
                    pathRewrite: {
                        '^/api': ''
                    }
                },
            }
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        // ...other loaders
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: {
                                    'hack': `true; @import "~assets/less/base.less";`
                                }
                            }
                        }
                    ]
                }
            ]
        }


    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
                    }),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'],
                    })
                ]
            }
        }
    },


}