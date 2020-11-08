import React, {
	KeyboardEventHandler,
	useCallback,
	useEffect,
	useMemo, useRef,
	useState,
} from 'react';

import { getFloatRegex, intRegex, noop } from '../../../helpers';
import { EventInput } from '../../../types';
import { Field, StyledInput } from './Input.styled';
import webpack from 'webpack';
import prefix = webpack.Template.prefix;

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
	 * A string to show before input value
	 */
	prefix?: string;

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
	prefix: '',
	onChange: noop,
	onControlsReady: noop,
};

/**
 * Handle key press
 * @param e - keyboard event
 */
const onKeyPress: KeyboardEventHandler = e => {

	if (e.key === 'Enter' || e.key === 'Escape') {
		// Fire blur event
		const input = e.target as HTMLInputElement;
		input.blur();
	}
};

/**
 * Input component
 */
const Input: React.FC<Props> = React.memo(props => {

	const {
		type, initialValue, onControlsReady, id, isDisabled, placeholder,
		onChange, prefix,
	} = props;

	const [inputValue, setValue] = useState<string | number>(initialValue);
	const [isFocused, setFocused] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>();

	// Create controls object and pass it to onControlsReady
	useEffect(() => {
		// Init controls object
		const controls: Controls = {

			setValue: (newValue: string | number) => {
				// Set value if it has changed
				if (newValue !== inputRef.current?.value) {
					setValue(newValue);
				}
			},
		};
		// Send controls object
		onControlsReady(controls);

	}, [onControlsReady, setValue, inputRef, onChange]);

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
	const onChangeHandler = useCallback((e: EventInput) => {
		const { target: { value } } = e;

		// Update value only if it matches the pattern or is empty string
		if (valueRegex.test(value) || value === '') {
			setValue(value);
			onChange(value);
		}
	}, [valueRegex, onChange]);

	// Focus event handler
	const onFocus = useCallback(() => {
		setFocused(true);
	}, [setFocused]);

	// Blur event handler
	const onBlur = useCallback(() => {
		setFocused(false);
	}, [setFocused]);

	return (
		<Field isFocused={ isFocused }>
			{ prefix }
			<StyledInput
				id={ id }
				value={ inputValue }
				onChange={ onChangeHandler }
				disabled={ isDisabled }
				placeholder={ placeholder }
				onFocus={ onFocus }
				onBlur={ onBlur }
				onKeyUp={ onKeyPress }
				ref={ inputRef }
			/>
		</Field>
	);
});

Input.displayName = 'Input';
Input.defaultProps = defaultProps;

export {
	Props as InputProps,
	Controls as InputControls,
};
export default Input;
