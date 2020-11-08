import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import { DropdownStore, OnChange, OptionWithId } from '../types';
import { StyledOption } from './Option.styled';

type Props<T> = React.PropsWithChildren<OptionWithId<T> & {
	/**
	 * Dropdown store
	 */
	store: DropdownStore<T>;

	/**
	 * Click event handler
	 */
	onSelect: OnChange<T>;
}>

/**
 * Dropdown Option component
 */
function DropdownOption<T>(props: Props<T>): React.ReactElement {

	const { store, id, display, value, onSelect } = props;

	const isActive = store.currentOption.id === id;

	const onClick = useCallback(() => {
		store.currentOption = { id, display, value };
		store.isOpen = false;

		onSelect(value);

	}, [onSelect, value, display, store, id]);

	return (
		<StyledOption
			isActive={ isActive }
			onClick={ onClick }
		>
			{ display }
		</StyledOption>
	);
}

export default observer(DropdownOption);


