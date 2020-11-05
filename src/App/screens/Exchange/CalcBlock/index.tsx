import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react';

import {
	Input,
	Dropdown,
	InputControls,
	DropdownOption,
} from '../../../../ui-kit/elements';

import { Currency, CurrencyCode } from '../../../../types';
import { currencies } from '../../../../common/data';
import { CalcType } from '../types';
import exchange from '../store';
import { Container, InputWrapper } from './CalcBlock.styled';
import { roundTo } from '../../../../helpers/utils';

type Props = {
	type: CalcType;
}

// Parse currencies for dropdown
const currencyOptions = (
	(): DropdownOption<Currency>[] => {
		const result: DropdownOption<Currency>[] = [];

		for (const key in currencies) {

			if (!Object.prototype.hasOwnProperty.call(currencies, key)) {
				continue;
			}
			const currency = currencies[key as CurrencyCode];

			result.push({
				value: currency,
				display: currency.code,
			});
		}

		return result;
	}
)();

/**
 * Calculation block component
 */
const CalcBlock: React.FC<Props> = observer(props => {

	const { type } = props;
	const input = useRef<InputControls>();

	const currentQuantity = exchange.values[type].quantity;
	const values = exchange.values;

	// Trace store value changes and update the input
	useEffect(() => {
		const rounded = roundTo(currentQuantity, 2);
		input.current?.setValue(rounded);

	}, [currentQuantity]);

	// Setup controls object to handle input value
	const setupInputControls = useCallback(controls => {

		input.current = controls;
	}, []);

	// Dropdown onChange handler
	const onCurrencyChange = useCallback((currency: Currency): void => {

		exchange.setCurrency(currency, type);
	}, [type]);

	// Input onChange handler
	const onQuantityChange = useCallback(newQnt => {

		if (newQnt === '') {
			return;
		}
		const qnt = parseFloat(newQnt);
		exchange.setQuantity(qnt, type);

	}, [type]);

	// Default dropdown option
	const defaultOption = useMemo((): DropdownOption<Currency> => {

		const currency = exchange.values[type].currency;

		return {
			value: currency,
			display: currency.code,
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isQntDisabled = values.from.currency.code === values.to.currency.code;

	return (
		<Container calcType={ type }>
			<InputWrapper isDisabled={ false }>
				<Dropdown<Currency>
					defaultOption={ defaultOption }
					options={ currencyOptions }
					onChange={ onCurrencyChange }
				/>
			</InputWrapper>

			<InputWrapper isDisabled={ isQntDisabled }>
				<Input
					type="float2"
					onChange={ onQuantityChange }
					initialValue={ exchange.values[type].quantity }
					onControlsReady={ setupInputControls }
					isDisabled={ isQntDisabled }
				/>
			</InputWrapper>

		</Container>
	);
});

export default CalcBlock;
