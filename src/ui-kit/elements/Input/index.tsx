import React from 'react';
import { noop } from '../../../helpers';

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
	 * Parse input value
	 */
	parseValue: (value: string) => string | 'int' | 'float';

	/**
	 * Initial input value
	 */
	initialValue: string | number;

	/**
	 * A callback that gets Controls object as an argument
	 */
	useControls?: (controls: Controls) => void;

	/**
	 * Input id - is needed for the form component
	 */
	id?: string;
}

const defaultProps: Partial<Props> = {
	useControls: noop,
};

/**
 * Input component
 */
const Input: React.FC<Props> = React.memo(props => {

	const { parseValue, initialValue, useControls, id } = props;

	return (
		<input id={ id } />
	);
});

Input.displayName = 'Input';
Input.defaultProps = defaultProps;

export {
	Props as InputProps,
	Controls as InputControls,
};
export default Input;
