import { Balance, Currency, CurrencyCode, ExchangeHistory } from '../../types';

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
/*
* - 100 EUR + 118.30 USD
* -30 EUR + 27.01 GBP
* - 300 USD + 113.13 GBP
* */
const currenciesArr: CurrencyCode[] = ['GBP', 'EUR', 'USD'];

const initialBalance: Balance = {
	EUR: 1160.12,
	GBP: 580.33,
	USD: 250.51,
};

const initialHistory: ExchangeHistory = {
	GBP: [
		{
			operation: 'from',
			currency: 'EUR',

			changeInThis: 27.01,
			changeInOther: 30,
		},
		{
			operation: 'from',
			currency: 'USD',

			changeInThis: 228.51,
			changeInOther: 300,
		},
	],

	EUR: [
		{
			operation: 'to',
			currency: 'USD',

			changeInThis: 100,
			changeInOther: 118.3,
		},
		{
			operation: 'to',
			currency: 'GBP',

			changeInThis: 30,
			changeInOther: 27.01,
		},
	],

	USD: [
		{
			operation: 'from',
			currency: 'EUR',

			changeInThis: 118.3,
			changeInOther: 100,
		},
		{
			operation: 'to',
			currency: 'GBP',

			changeInThis: 300,
			changeInOther: 228.51,
		},
	],
};

export {
	currencies,
	currenciesArr,
	initialBalance,
	initialHistory,
};
