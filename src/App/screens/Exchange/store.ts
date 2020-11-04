import { action, computed, observable } from 'mobx';

import { Currency } from '../../../types';
import { currencies } from '../../../common/data';
import { get } from '../../../helpers/utils';
import { CalcType, ExchangeValues } from './types';

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
		const quantity = get(this._values, `${ calcType }.quantity`);
		this._rate = rate;

		// Update values
		this._values[calcType] = { quantity, currency };
		this.syncQuantities(calcType);
	}

	@action setQuantity(quantity: number, calcType: CalcType): void {
		// Get currency
		const currency = get(this._values, `${ calcType }.currency`);

		// Update values
		this._values[calcType] = { quantity, currency };
		this.syncQuantities(calcType);
	}

	@action setRate(newRate: number): void {
		this._rate = newRate;
		this._values.from.quantity = this._values.to.quantity * newRate;
	}

	/*
	 * Private props
	 */
	@observable private _rate: IExchange['rate'] = 0.74;

	@observable private _values: IExchange['values'] = {
		from: {
			currency: currencies.GBP,
			quantity: 0,
		},
		to: {
			currency: currencies.EUR,
			quantity: 0,
		},
	};

	/*
	 * Private methods
	 */
	@action syncQuantities(typeThatChanged: CalcType): void {
		const { quantity } = this._values[typeThatChanged];

		const otherType = typeThatChanged === 'to' ? 'from' : 'to';
		const ratio = typeThatChanged === 'to' ? this._rate : 1 / this._rate;

		this._values[otherType].quantity = ratio * quantity;
	}
}

const exchange = new Exchange();

export default exchange;
