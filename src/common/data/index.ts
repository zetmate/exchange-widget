import { Currency } from '../../types';

const currencies: { [key: string]: Currency } = {
	usd: {
		code: 'USD',
		symbol: '$',
	},

	eur: {
		code: 'EUR',
		symbol: '€',
	},

	gbp: {
		code: 'GBP',
		symbol: '£',
	},
};

export {
	currencies,
};
