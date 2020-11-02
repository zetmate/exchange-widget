const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	target: 'web',

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
	},

	entry: {
		// vendor js
		react: ['react', 'react-dom', 'react-router', 'react-router-dom'],
		mobx: ['mobx', 'mobx-react'],

		// app js
		app: './src/index.tsx',
	},

	output: {
		publicPath: '',
	},

	module: {
		rules: [
			// Typescript
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'ts-loader'],
			},

			// Styles
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader'],
			},

			// Eslint
			{
				enforce: 'pre',
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ['eslint-loader'],
			},
		],
	},

	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Exchange',
			template: require('html-webpack-template'),
			appMountId: 'app',
		}),
	],
};
