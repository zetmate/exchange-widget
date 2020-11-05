import { action, computed, observable } from 'mobx';
import axios, { AxiosResponse } from 'axios';

import { Currency, RatesResponse } from '../../../types';
import { currencies, currenciesArr } from '../../../common/data';
import { get, isNil } from '../../../helpers/utils';
import app from '../../store';
import { CalcType, ExchangeValues } from './types';

const RATES_URL = 'https://api.exchangeratesapi.io/latest';

type RatesParams = {
	/**
	 * Base currency
	 */
	base: string;

	/**
	 * Fetch only currencies specified in this list
	 */
	symbols: string;
}

/**
 * Interface for exchanging currencies
 */
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
	 * Flag: is it possible to submit
	 */
	canBeSubmitted: boolean;

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
	setCurrency(currency: Currency, calcType: CalcType): void;

	/**
	 * Start updating rates every 10 seconds
	 */
	startUpdatingRates(): void;

	/**
	 * Stop updating rates
	 */
	stopUpdatingRates(): void;
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

	@computed get canBeSubmitted(): IExchange['canBeSubmitted'] {

		const areCurrenciesValid = (
			this._values.to.currency.code
			!== this._values.from.currency.code
		);

		// Check if there's enough money
		const { quantity, currency: { code } } = this._values.from;
		const isEnoughMoney = quantity <= app.balance[code];

		return areCurrenciesValid && isEnoughMoney;
	}

	/*
	 * Public methods
	 */
	// TODO: implement me!
	submit = (): ReturnType<IExchange['submit']> => Promise.resolve();

	@action setCurrency(currency: Currency, calcType: CalcType): void {

		// Do nothing if has not changed
		if (currency.code === this._values[calcType].currency.code) {
			return;
		}

		// Get quantity
		const quantity = get(this._values, `${ calcType }.quantity`);

		// Update values
		this._values[calcType] = { quantity, currency };

		// If not base currency, get rate from pre-fetched
		if (calcType === 'to') {
			const toCurr = this._values.to.currency.code;
			const fromCurr = this._values.from.currency.code;

			const areSame = toCurr === fromCurr;

			this._rate = areSame ? 1 : this._rates[currency.code];

			this.syncQuantities('from');
		}
		// Otherwise re-fetch rates
		else {
			this._rate = null;

			if (this.timerId) {
				this.stopUpdatingRates();
				this.startUpdatingRates();
			} else {
				void this.fetchRates();
			}
		}
	}

	@action setQuantity(quantity: number, calcType: CalcType): void {
		// Get currency
		const currency = get(this._values, `${ calcType }.currency`);

		// Update values
		this._values[calcType] = { quantity, currency };
		this.syncQuantities(calcType);
	}

	@action startUpdatingRates(): void {
		void this.fetchRates();
		// FIXME: change to 10 seconds
		this.timerId = setInterval(this.fetchRates.bind(this), 36000000);
	}

	stopUpdatingRates(): void {
		if (isNil(this.timerId)) {
			return;
		}
		clearTimeout(this.timerId);
		this.timerId = null;
	}

	/*
	 * Private props
	 */
	@observable private _rate: IExchange['rate'] = null;
	@observable private _rates: RatesResponse['rates'] = null;

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

	private timerId: any = null;

	/*
	 * Private methods
	 */
	@action
	private syncQuantities(baseType: CalcType): void {
		const { quantity } = this._values[baseType];

		const otherType = baseType === 'to' ? 'from' : 'to';
		const ratio = baseType === 'from' ? this._rate : 1 / this._rate;

		this._values[otherType].quantity = ratio * quantity;
	}

	@action
	private setRate(newRate: number): void {
		if (this._rate === newRate) {
			return;
		}
		this._rate = newRate;
		this._values.to.quantity = this._values.from.quantity * newRate;
	}

	@action
	private async fetchRates(): Promise<void> {
		const base = this._values.from.currency.code;

		// Get all currency codes except the base one
		const codes = currenciesArr.reduce((result, code) => {
			if (code !== base) {
				result.push(code);
			}
			return result;
		}, []);

		const params: RatesParams = {
			base,
			symbols: codes.join(','),
		};

		axios.get(RATES_URL, { params })
			.then(
				(response: AxiosResponse<RatesResponse>) => {
					this._rates = response.data?.rates;

					const codeTo = this._values.to.currency.code;
					const rate = this._rates[codeTo] || 1;
					this.setRate(rate);

					return response;
				},
				err => {
					console.error('Rates fetch failed with error', err);
				},
			)
		;
	}
}

const exchange = new Exchange();

export default exchange;
