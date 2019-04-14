const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const IsFormalProduction = process.env.VUE_APP_TITLE === 'production';
const IsDevelopment = process.env.VUE_APP_TITLE === 'development';
const IsTest = process.env.VUE_APP_TITLE === 'test';

const cdn = {
  css: [
    'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css',
    'https://unpkg.com/ant-design-vue@1.3.6/dist/antd.min.css'
  ],
  js: [
    'https://cdn.bootcss.com/vue/2.6.8/vue.min.js',
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    'https://cdn.bootcss.com/vue-ls/3.2.0/vue-ls.min.js',
    'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
    'https://cdn.bootcss.com/moment.js/2.22.2/moment.min.js',
    'https://cdn.bootcss.com/moment.js/2.22.2/locale/zh-cn.js',
    'https://unpkg.com/ant-design-vue@1.3.6/dist/antd.min.js',
    'https://cdn.bootcss.com/jsencrypt/3.0.0-rc.1/jsencrypt.min.js'
  ]
};

const envConfig = {
  dev: {},
  test: {
    config: ['/testConfig.js']
  },
  build: {
    config: ['/cmdb/buildConfig.js']
  }
};

module.exports = {
  publicPath: process.env.VUE_APP_PREFIX,
  outputDir: process.env.outputDir,
  assetsDir: process.env.assetsDir,
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.VUE_APP_TITLE === 'development') {
      config.devtool = '#eval-source-map';
    } else {
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        vuex: 'Vuex',
        moment: 'moment',
        'ant-design-vue': 'antd',
        nprogress: 'NProgress',
        'vue-ls': 'VueStorage',
        JSEncrypt: 'JSEncrypt'
      };
      const plugins = [];
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src').set('_c', resolve('src/components')));
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    config.plugin('html').tap(args => {
      if (IsFormalProduction) {
        args[0].cdn = cdn;
        args[0].config = envConfig.build.config;
      } else if (IsTest) {
        args[0].cdn = cdn;
        args[0].config = envConfig.test.config;
      }
      return args;
    });
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  }
};
