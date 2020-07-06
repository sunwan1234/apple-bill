const path = require('path')

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        const dir = path.resolve(__dirname, 'src/assets/icons') // 当前目录

        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)
            .include.add(dir).end() // 只包含icons目录
            .use('svg-sprite-loader').loader('svg-sprite-loader')
            .options({extract: false}).end() //不需要解析成文件
        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
        config.module.rule('svg').exclude.add(dir) // 其他svg loader排除icons目录


    }

}
