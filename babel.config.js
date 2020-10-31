const commonConfig = require('./babel.common');

const devConfigPath = './babel.dev';
const prodConfigPath = './babel.prod';

module.exports = function (api) {
	return {
		...commonConfig,
		extends: api.env('production') ? prodConfigPath : devConfigPath,
	};
};
