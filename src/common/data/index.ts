import { Currency, CurrencyCode } from '../../types';

const currencies: { [key in CurrencyCode]: Currency } = {
	USD: {
		code: 'USD',
		symbol: '$',
	},

	EUR: {
		code: 'EUR',
		symbol: '€',
	},

	GBP: {
		code: 'GBP',
		symbol: '£',
	},
};

export {
	currencies,
};
