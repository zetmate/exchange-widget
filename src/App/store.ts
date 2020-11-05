import { action, computed, observable } from 'mobx';

import {
	Balance,
	CurrencyCode,
	ExchangeHistory,
	ExchangeRecord,
} from '../types';

import { initialBalance, initialHistory } from '../common/data';

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

class AppStore implements IAppStore {

	@observable balance: IAppStore['balance'] = initialBalance;

	@computed get history(): IAppStore['history'] {
		return this._history;
	}

	@action addNewRecord(currency: CurrencyCode, record: ExchangeRecord): void {
		this._history[currency].push(record);
	}

	@observable private _history: IAppStore['history'] = initialHistory;
}

const app = new AppStore();

export default app;
