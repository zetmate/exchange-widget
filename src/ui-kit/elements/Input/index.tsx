import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { getFloatRegex, intRegex, noop } from '../../../helpers';
import { EventInput } from '../../../types';
import { Field } from './Input.styled';

/**
 * This interface allows to control component from the outside
 */
type Controls = {
	/**
	 * Set new value
	 */
	setValue(value: string | number): void;
}

type Props = {
	/**
	 * Initial input value
	 */
	initialValue?: string | number;

	/**
	 * Type of the input value
	 */
	type?: 'string' | 'int' | 'float2';

	/**
	 * Input id - is needed for the form component
	 */
	id?: string;

	/**
	 * Placeholder
	 */
	placeholder?: string;

	/**
	 * If true, no user changes will be allowed,
	 * setting value from controls will still work
	 */
	isDisabled?: boolean;

	/**
	 * Handle onChange event
	 * @param value - current
	 */
	onChange?: (value: string) => void;

	/**
	 * A callback that gets Controls object as an argument
	 */
	onControlsReady?: (controls: Controls) => void;
}

const defaultProps: Partial<Props> = {
	type: 'string',
	initialValue: '',
	isDisabled: false,
	onChange: noop,
	onControlsReady: noop,
};

/**
 * Input component
 */
const Input: React.FC<Props> = React.memo(props => {

	const {
		type, initialValue, onControlsReady, id, isDisabled, placeholder,
	} = props;

	const [inputValue, setValue] = useState<string | number>(initialValue);

	// Create controls object and pass it to onControlsReady
	useEffect(() => {
		// Init controls object
		const controls: Controls = {
			setValue: (newValue: string | number) => setValue(newValue),
		};
		// Send controls object
		onControlsReady(controls);

	}, [onControlsReady, setValue]);

	const valueRegex = useMemo(() => {
		switch (type) {
			case 'string':
				return new RegExp(/./);
			case 'int':
				return intRegex;
			case 'float2':
				return getFloatRegex(2);
		}
	}, [type]);

	// Change event handler
	const onChange = useCallback((e: EventInput) => {
		const { target: { value } } = e;

		// Update value only if it matches the pattern or is empty string
		if (valueRegex.test(value) || value === '') {
			setValue(value);
		}
	}, [valueRegex]);

	return (
		<Field
			id={ id }
			value={ inputValue }
			onChange={ onChange }
			disabled={ isDisabled }
			placeholder={ placeholder }
		/>
	);
});

Input.displayName = 'Input';
Input.defaultProps = defaultProps;

export {
	Props as InputProps,
	Controls as InputControls,
};
export default Input;
