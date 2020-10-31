module.exports = {
	babelrcRoots: [
		'.',
		'packages/*',
	],
	presets: [
		'@babel/preset-react',
		[
			'@babel/preset-typescript',
			{
				allExtensions: true,
				isTSX: true,
				allTypes: true,
			},
		],
	],
	plugins: [
		[
			'babel-plugin-styled-components',
			{ displayName: true },
		],
	],
	exclude: '**/node_modules/**',
};
