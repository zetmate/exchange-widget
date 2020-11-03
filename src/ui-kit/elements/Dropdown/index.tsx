import React from 'react';

type Option<T> = {
	/**
	 * Value of the option that is passed to onChange handler. Not visible.
	 */
	value: T;

	/**
	 * This will be displayed for user
	 */
	display: React.ReactElement;
}

type Props<T> = {
	/**
	 * List of options to render
	 */
	options: Option<T>[];

	/**
	 * OnChange handler
	 * @param value - value of the selected option
	 */
	onChange: (value: T) => void;
}

// This type is defined only to shorten the component definition below
type PropsType<T> = React.PropsWithChildren<Props<T>>;

/**
 * Dropdown component
 */
function Dropdown<T>(props: PropsType<T>): React.ReactElement {

	return null;
}

Dropdown.displayName = 'Dropdown';

export {
	Props as DropdownProps,
	Option as DropdownOption,
};
export default React.memo(Dropdown);
