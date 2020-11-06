import React from 'react';

import { Theme } from '../styles/theme';

/*
 * Styles
 */
export type StyledProps = {
	theme: Theme;
};

export type StyledComponent = React.FC<StyledProps>;

/*
 * Utils
 */
export type EventInput = React.ChangeEvent<HTMLInputElement>;

/*
 * Data
 */
export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export type Currency = {
	symbol: string;
	code: CurrencyCode;
}

export type Balance = { [key in CurrencyCode]: number };

export type ExchangeRecord = {
	operation: 'to' | 'from';
	currency: CurrencyCode;

	changeInThis: number;
	changeInOther: number;
}

export type ExchangeHistory = { [key in CurrencyCode]: ExchangeRecord[] };

/*
 * API
 */
export type RatesResponse = {
	rates: { [key in CurrencyCode]: number };
	base?: CurrencyCode;
	date?: string;
}
