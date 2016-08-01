const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const parts = require('./lib/parts');

const PATHS = {
	app: path.join(__dirname, 'src', 'index.js'),
	style: path.join(__dirname, 'src/assets/styles', 'main.css'),
	build: path.join(__dirname, 'build')
};

const common = {
	entry: {
		style: PATHS.style,
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack demo',
			template: 'src/index.ejs'
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel?cacheDirectory'],
				exclude: /node_modules/
			}
		]
	},
	postcss: function () {
		return [precss, autoprefixer];
	}
};

var config;

switch(process.env.npm_lifecycle_event) {
	case 'build':
	case 'stats':

		config = merge(
			common,
			{
			devtool: 'source-map',
				output: {
					publicPath: '/webpack-demo/build/',
					filename: '[name].[chunkhash].js',
					chunkFilename: '[chunkhash].js'
				}
			},
			parts.clean(PATHS.build),
			parts.setFreeVariable(
				'process.env.NODE_ENV',
				'production'
			),
			parts.extractBundle({
				name: 'vendor',
				entries: ['react']
			}),

			parts.extractCSS(PATHS.style),
			parts.minify()
		);
		break;
	default:
		config = merge(
			common,
			{
				devtool: 'eval-source-map'
			},
			parts.setupCSS(PATHS.style),
			parts.devServer({
				host: process.env.HOST,
				port: 8080
			})
		);
}

module.exports = validate(config);