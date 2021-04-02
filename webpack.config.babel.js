import cloneDeep from 'lodash/cloneDeep';
import CopyWebpackPlugin from 'copy-webpack-plugin';
// import OptimizeJsPlugin from 'optimize-js-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// for webpack version 4 https://www.npmjs.com/package/webpack
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

import { headSetting } from './src/config/themeConfig';

const PROJECT_ROOT = path.resolve(__dirname, './');
const DIST_PATH = path.resolve(__dirname, './dist');
const SRC_PATH = path.resolve(__dirname, './src');
const NODE_MODULES_PATH = path.resolve(__dirname, './node_modules');

// Module path resolve
const PUBLIC_PATH = path.resolve(PROJECT_ROOT, 'public');
const MODULES_PATH = path.resolve(SRC_PATH, 'modules');
const INTL_DES_PATH = path.resolve(SRC_PATH, 'shared/intl/descriptors');
const STORE_PATH = path.resolve(SRC_PATH, 'store');
const SRC_UTILS_PATH = path.resolve(SRC_PATH, 'utils');

// TODO White Label Setting
const { favicon, appleTouchIcon, headTitle, metaList, applicationName } = headSetting;

const JSLoader = {
  test: /(\.js|\.jsx)$/,
  include: [
    SRC_PATH,
    /react-router/,
    /lodash-es/,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          { targets: { node: 'current' } },
        ],
        '@babel/preset-react',
      ],
      cacheDirectory: false,
    },
  },
};

// Add plugin to generate static report of bundle analyzer
const addBundleAnalysisConfig = (config) => {
  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: path.resolve(__dirname, 'bundleAnalyzer', `${config.output.filename}.html`),
  }));
};

const baseConfig = {
  context: SRC_PATH,
  entry: {
    // large chunks parrallel loading
    vendor: [
      'react',
      'lodash',
    ],
    mcdb: [
      `${SRC_PATH}/init`,
    ],
  },
  output: {
    path: DIST_PATH,
    library: 'liveConnect',
    filename: '[name].bundle.js',
    chunkFilename: 'chunk-[chunkhash:12].js',
    publicPath: './',
  },
  resolve: {
    alias: {
      react: `${NODE_MODULES_PATH}/react`,
      // Use no debug and min version of soundmanager2
      soundmanager2: `${NODE_MODULES_PATH}/soundmanager2/script/soundmanager2-nodebug-jsmin.js`,
      // resolve to use joi-browser for client-side joi
      highcharts: `${NODE_MODULES_PATH}/highcharts`,
      // Modules path shorter
      PUBLIC: PUBLIC_PATH,
      MODULES: MODULES_PATH,
      INTL: INTL_DES_PATH,
      STORE: STORE_PATH,
      SRC_UTILS: SRC_UTILS_PATH,
      SRC: SRC_PATH,
    },
    extensions: ['.json', '.jsx', '.js'],
    modules: [path.join(__dirname, 'node_modules'), 'node_modules'],
  },
  module: {
    rules: [
      JSLoader,
      {
        test: /\.(eot|woff|woff2|ttf|jpe?g|png|gif)$/i,
        use: ['url-loader'],
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
    new HtmlWebpackPlugin({
      template: `${SRC_PATH}/index.html`,
      filename: 'index.html',
      minify: { removeComments: true, collapseWhitespace: true },
      title: headTitle,
      favicon,
      meta: metaList,
    }),
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty',
  },
  devServer: {
    // hot: false,
    // inline: false,
    // host: '0.0.0.0',
    // useLocalIp: true,
    port: 3020,
    contentBase: DIST_PATH,
    publicPath: '/',
  },
};

module.exports = (env = {}, argv) => {
  const project = cloneDeep(baseConfig);
  if (env.enableAnalysis) {
    addBundleAnalysisConfig(project);
  }
  if (argv.mode === 'development') {
    project.devtool = 'source-map';
  }

  if (argv.https) {
    project.devServer.host = '0.0.0.0';
    project.devServer.useLocalIp = true;
  }

  return [project];
};
