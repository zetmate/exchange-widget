import { action, computed, observable } from 'mobx';
import { fmod } from '../../../helpers';

interface ICarouselStore {

	/**
	 * Current element index
	 */
	currentIndex: number;

	/**
	 * Previously showed index
	 * NB: need this for animation
	 */
	prevIndex: number;

	/**
	 * Number of elements in carousel
	 */
	size: number;

	/**
	 * Change size
	 */
	setSize(newSize: number): void;

	/**
	 * Show next element
	 */
	next(): void;

	/**
	 * Show previous element
	 */
	prev(): void;

	/**
	 * Show element at index
	 * @param index
	 */
	switchTo(index: number): void;
}

class CarouselStore implements ICarouselStore {

	// Public props
	@computed get currentIndex(): ICarouselStore['currentIndex'] {
		return this._currentIndex;
	}

	@computed get prevIndex(): ICarouselStore['prevIndex'] {
		return this._prevIndex;
	}

	get size(): ICarouselStore['size'] {
		return this._size;
	}

	@action setSize(newSize: ICarouselStore['size']) {
		// Do nothing if size is already correct
		if (this._size === newSize) {
			return;
		}
		this._size = newSize;

		// Ensure index fits new size
		this._currentIndex = fmod(this._currentIndex, this._size);
	}

	// Constructor
	constructor(size: number) {
		this._size = size;
	}

	// Public methods
	@action next(): ReturnType<ICarouselStore['next']> {
		this.switchTo(this._currentIndex + 1);
	}

	@action prev(): ReturnType<ICarouselStore['prev']> {
		this.switchTo(this._currentIndex - 1);
		console.log('current', this.currentIndex);
	}

	@action switchTo(
		newIndex: ICarouselStore['currentIndex'],
	): ReturnType<ICarouselStore['switchTo']> {

		this._prevIndex = this._currentIndex;
		this._currentIndex = fmod(newIndex, this._size);
	}

	// Private props
	@observable private _currentIndex: ICarouselStore['currentIndex'] = 0;
	@observable private _prevIndex: ICarouselStore['prevIndex'] = 0;
	private _size: ICarouselStore['size'];
}

export {
	CarouselStore,
	ICarouselStore,
};
