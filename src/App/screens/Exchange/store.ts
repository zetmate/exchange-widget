import { action, computed, observable } from 'mobx';

import { Currency } from '../../../types';
import { get } from '../../../helpers/utils';
import { CalcType, ExchangeValue, ExchangeValues } from './types';

interface IExchange {
	/**
	 * Get current data
	 */
	values: ExchangeValues;

	/**
	 * Exchange rate
	 */
	rate: number;

	/**
	 * Send changes to the server
	 */
	submit(): Promise<void>;

	/**
	 * Set new quantity
	 */
	setQuantity(quantity: number, calcType: CalcType): void;

	/**
	 * Select another currency
	 */
	setCurrency(currency: Currency, rate: number, calcType: CalcType): void;

	/**
	 * Set exchange rate
	 */
	setRate(newRate: number): void;
}

const emptyExchangeValue: ExchangeValue = {
	currency: null,
	quantity: 0,
};

class Exchange implements IExchange {
	/*
	 * Public props
	 */
	@computed get values(): IExchange['values'] {
		return this._values;
	}

	@computed get rate(): IExchange['rate'] {
		return this._rate;
	}

	/*
	 * Public methods
	 */
	// TODO: implement me!
	submit = (): ReturnType<IExchange['submit']> => Promise.resolve();

	@action setCurrency(
		currency: Currency,
		rate: number,
		calcType: CalcType,
	): void {
		// Get quantity
		const quantity = get(this.values, `${ calcType }.quantity`);

		// Update value
		this.values[calcType] = { quantity, currency };
	}

	@action setQuantity(quantity: number, calcType: CalcType): void {
		// Get currency
		const currency = get(this.values, `${ calcType }.currency`);

		// Update value
		this.values[calcType] = { quantity, currency };

		// Determine other quantity
		const otherType = calcType === 'to' ? 'from' : 'to';
		const ratio = calcType === 'to' ? this._rate : 1 / this._rate;

		this.values[otherType].quantity = ratio * quantity;
	}

	@action setRate(newRate: number): void {
		this._rate = newRate;
		this._values.from.quantity = this._values.to.quantity * newRate;
	}

	/*
	 * Private props
	 */
	@observable private _rate: IExchange['rate'];

	@observable private _values: IExchange['values'] = {
		to: emptyExchangeValue,
		from: emptyExchangeValue,
	};
}

const exchange = new Exchange();

export default exchange;
