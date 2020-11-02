module.exports = {
	testMatch: ['**/*spec.ts?(x)', '**/*test.ts?(x)'],
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
	],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.jest.json',
		},
	},
	moduleDirectories: [
		'node_modules',
		'src',
	],
	testPathIgnorePatterns: [
		'<rootDir>/node_modules',
	],
	transform: {
		'\\.(ts|tsx)$': 'ts-jest',
		'\\.js$': 'babel-jest',
	},
	transformIgnorePatterns: [
		'node_modules/(?!(@scc)/)',
	],
};
