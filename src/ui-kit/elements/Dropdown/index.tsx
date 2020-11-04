import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { observer, useLocalStore } from 'mobx-react';

import CaretIcon from '../../icons/Caret';
import { useTheme } from '../../../styles/theme';
import { Field } from '../Input/Input.styled';
import { DropdownStore, OnChange, Option } from './types';
import OptionsList from './OptionsList';

type Props<T> = React.PropsWithChildren<{
	/**
	 * List of options to render
	 */
	options: Option<T>[];

	/**
	 * Option selected by default
	 */
	defaultOption?: Option<T>;

	/**
	 * Input placeholder
	 */
	placeholder?: string;

	/**
	 * OnChange handler
	 * @param value - value of the selected option
	 */
	onChange?: OnChange<T>;
}>

/*
 * Test constants
 */
const DD_FIELD_TEST_ID = 'dropdown__field';

/**
 * Dropdown component
 */
function Dropdown<T>(props: Props<T>): React.ReactElement {

	const { options, placeholder, onChange, defaultOption } = props;

	const fieldRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();

	const store = useLocalStore<DropdownStore<T>>(() => ({
		isOpen: false,
		field: null,
		currentOption: {
			...(defaultOption || { display: placeholder, value: undefined }),
			id: 0,
		},
	}));

	useEffect(() => {
		store.field = fieldRef.current;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fieldRef.current]);

	const caret = useMemo(() => (
		<CaretIcon
			direction="down"
			size="3vh"
			color={ theme.colors.transparentWhite }
		/>
	), [theme]);

	const onClick = useCallback(() => {
		store.isOpen = !store.isOpen;
	}, [store]);

	return (
		<div>
			<div
				ref={ fieldRef }
				onClick={ onClick }
				data-testid={ DD_FIELD_TEST_ID }
			>
				<Field
					isFocused={ store.isOpen }
					justifyContent="space-between"
					alignItems="center"
				>
					{ store.currentOption?.display || 'Select' }
					{ caret }
				</Field>

			</div>

			<OptionsList
				store={ store }
				options={ options }
				onChange={ onChange }
			/>

		</div>
	);
}

Dropdown.displayName = 'Dropdown';

export {
	Props as DropdownProps,
	Option as DropdownOption,
	DD_FIELD_TEST_ID,
};
export default observer(Dropdown);
