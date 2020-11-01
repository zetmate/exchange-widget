const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// TODO: add source map
module.exports = merge(common, {
	mode: 'development',

	devServer: {
		port: 2002,
		overlay: false,
		clientLogLevel: 'debug',
		historyApiFallback: true,
	},

	output: {
		filename: '[name].bundle.js',
	},
});
