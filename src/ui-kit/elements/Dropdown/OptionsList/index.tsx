import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';

import { Theme, useTheme } from '../../../../styles/theme';
import { Option, DropdownStore, OnChange } from '../types';
import DropdownOption from '../Option';
import { generateHash, isFunction, isNil } from '../../../../helpers/utils';
import { Container } from './OptionsList.styled';

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
}>

/**
 * Space needed to render list. Value is a (space / height) ratio
 */
const REQUIRED_SPACE_RATIO = 0.3;

/**
 * Checks whether list should be on top of the field or at the bottom
 * @param bottom - field bottom position
 */
const checkIfShouldBeAbove = (bottom: number): boolean => {
	// Determine needed space in pixels
	const requiredSpacePX = window.innerHeight * REQUIRED_SPACE_RATIO;

	// Check if there's enough space left
	return window.innerHeight - bottom < requiredSpacePX;
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

	// For test environment
	if (process.env.NODE_ENV === 'test' && isNaN(height)) {
		return {};
	}
	// Check where to render the list
	const isAbove = checkIfShouldBeAbove(bottom);

	// Calculate position
	const position = isAbove
		? { bottom: window.innerHeight - bottom + height, left }
		: { top: top + height, left }
	;

	return {
		...position,
		width,
		position: 'absolute' as const,
		zIndex: theme.zIndex.modal,
		overflow: 'hidden' as const,

		// Remove overlapping border
		...(isAbove ? { borderBottom: 'none' } : { borderTop: 'none' }),
	};
};

/*
 *  Constants for tests
 */
const OPTIONS_SPY_NAME: any = generateHash();

const traceMemoryLeaks = (): void => {
	// Only for test env. Call a spy function if it exists
	if (process.env.NODE_ENV === 'test') {
		const spyFunc = window[OPTIONS_SPY_NAME] as any;

		isFunction(spyFunc) && spyFunc();
	}
};

/**
 * Dropdown Options list component
 */
function OptionsList<T>(props: Props<T>): React.ReactElement {

	const { store, onChange, options = [] } = props;
	const theme = useTheme();

	const [style, setStyle] = useState({});

	// Style for the wrapping element (positioning + etc)
	const updateWrapperStyle = useCallback(() => {
		// Do nothing if not open or field elm does not exist yet
		if (isNil(store.field)) {
			return;
		}

		// Compute position and other styles
		setStyle(getWrapperStyle(store.field, theme));

	}, [store?.field, theme]);

	// Update position on resize and parameters change
	useEffect(() => {
		updateWrapperStyle();

		// NB: need to define this to make sure that add and
		// remove listeners have the same callback reference
		const handler = (): void => {
			traceMemoryLeaks();
			updateWrapperStyle();
		};

		window.addEventListener('resize', handler);

		return () => {
			window.removeEventListener('resize', handler);
		};
	}, [updateWrapperStyle]);

	// Array of the options elements
	const optionsElms = useMemo(() => (

		options.map((option, key) => (
			<DropdownOption
				{ ...option }
				key={ key }
				id={ key + 1 }
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
		<Container style={ style }>
			{ optionsElms }
		</Container>
	);
}

OptionsList.displayName = 'OptionsList';

export {
	OPTIONS_SPY_NAME,
};

export default observer(OptionsList);
