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

/*
 * API
 */
export type RatesResponse = {
	rates: { [key in CurrencyCode]: number };
	base: CurrencyCode;
	date: string;
}
