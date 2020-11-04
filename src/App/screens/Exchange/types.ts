import { Currency } from '../../../types';

type ExchangeValue = {
	currency: Currency;
	quantity: number;
}

type ExchangeValues = {
	to: ExchangeValue;
	from: ExchangeValue;
}

type CalcType = keyof ExchangeValues;

export {
	CalcType,
	ExchangeValue,
	ExchangeValues,
};
