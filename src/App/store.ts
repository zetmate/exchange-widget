import { action, computed, observable } from 'mobx';

import {
	Balance,
	CurrencyCode,
	ExchangeHistory,
	ExchangeRecord,
} from '../types';

/**
 * Interface for manipulating data shared between screens
 */
interface IAppStore {
	/**
	 * Current balance
	 */
	balance: Balance;

	/**
	 * List of previous operations
	 */
	history: ExchangeHistory;

	/**
	 * Push new record to the history
	 */
	addNewRecord(currency: CurrencyCode, record: ExchangeRecord): void;
}

const initialBalance: Balance = {
	EUR: 1160.12,
	GBP: 580.33,
	USD: 250.51,
};

class AppStore implements IAppStore {

	@observable balance: IAppStore['balance'] = initialBalance;

	@computed get history(): IAppStore['history'] {
		return this._history;
	}

	@action addNewRecord(currency: CurrencyCode, record: ExchangeRecord): void {
		this._history[currency].push(record);
	}

	@observable private _history: IAppStore['history'] = {
		EUR: [],
		USD: [],
		GBP: [],
	};
}

const app = new AppStore();

export default app;
