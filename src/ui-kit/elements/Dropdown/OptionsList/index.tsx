import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';

import { Theme, useTheme } from '../../../../styles/theme';
import { Option, DropdownStore, OnChange } from '../types';
import DropdownOption from '../Option';
import { isNil } from '../../../../helpers/utils';

type Props<T> = React.PropsWithChildren<{
	/**
	 * Options list
	 */
	options: Option<T>[];

	/**
	 * Dropdown store
	 */
	store: DropdownStore<T>;

	/**
	 * Change event handler
	 */
	onChange: OnChange<T>;

	/**
	 * Field wrapper html element
	 */
	field: HTMLDivElement;
}>

/**
 * Space needed to render list. Value is a (space / height) ratio
 */
const REQUIRED_SPACE_RATIO = 0.05;

/**
 * Checks whether list should be on top of the field or at the bottom
 * @param bottom - field bottom position
 */
const checkIfShouldBeAbove = (bottom: number): boolean => {
	// Determine needed space in pixels
	const requiredSpacePX = window.innerHeight * REQUIRED_SPACE_RATIO;

	// Check if there's enough space left
	return bottom + requiredSpacePX < REQUIRED_SPACE_RATIO;
};

/**
 * Returns style for options list wrapper
 * @param field - field wrapper element
 * @param theme
 */
const getWrapperStyle = (field: HTMLElement, theme: Theme): unknown => {
	const { width, height: heightStr } = getComputedStyle(field);
	const { top, left, bottom } = field.getBoundingClientRect();

	const height = parseFloat(heightStr);

	const position = checkIfShouldBeAbove(bottom)
		? { bottom: bottom + height, left }
		: { top: top + height, left }
	;

	return {
		...position,
		width,
		position: 'absolute' as const,
		zIndex: theme.zIndex.modal,
		overflow: 'hidden' as const,
	};
};

/**
 * Dropdown Options list component
 */
function OptionsList<T>(props: Props<T>): React.ReactElement {

	const { store, onChange, field, options = [] } = props;
	const theme = useTheme();

	const [style, setStyle] = useState({});

	// Style for the wrapping element (positioning + etc)
	const updateWrapperStyle = useCallback(() => {

		// Do nothing if not open or field elm does not exist yet
		if (isNil(field) || !store.isOpen) {
			return;
		}

		// Compute position and other styles
		setStyle(getWrapperStyle(field, theme));

	}, [field, store.isOpen, theme]);

	// Update position on resize and parameters change
	useEffect(() => {
		updateWrapperStyle();
		window.addEventListener('resize', updateWrapperStyle);

		return () => {
			window.removeEventListener('resize', updateWrapperStyle);
		};
	}, [updateWrapperStyle]);

	// Array of the options elements
	const optionsElms = useMemo(() => (

		options.map((option, key) => (
			<DropdownOption
				{ ...option }
				key={ key }
				id={ key }
				store={ store }
				onSelect={ onChange }
			/>
		))
	), [options, store, onChange]);

	// Do not render anything if state is not open
	// NB: must be after any hook calls
	if (!store.isOpen) {
		return null;
	}

	return (
		<div style={ style }>
			{ optionsElms }
		</div>
	);
}

OptionsList.displayName = 'OptionsList';

export default observer(OptionsList);
