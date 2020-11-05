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

const currenciesArr: CurrencyCode[] = ['USD', 'EUR', 'GBP'];

export {
	currencies,
	currenciesArr,
};
