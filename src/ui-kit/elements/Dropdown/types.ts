type Option<T> = {
	/**
	 * Value of the option that is passed to onChange handler. Not visible.
	 */
	value: T;

	/**
	 * This will be displayed for user
	 */
	display: JSX.Element | string;
}

type OptionWithId<T> = Option<T> & {
	id: number;
}

type DropdownStore<T> = {
	isOpen: boolean;
	currentOption: OptionWithId<T>;
	field: HTMLDivElement;
}

type OnChange<T> = (value: T) => void;

export {
	Option,
	OptionWithId,
	DropdownStore,
	OnChange,
};
