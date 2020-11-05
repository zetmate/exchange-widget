import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react';

import {
	Input,
	Dropdown,
	InputControls,
	DropdownOption,
} from '../../../../ui-kit/elements';

import { Currency, CurrencyCode } from '../../../../types';
import { isNil, roundTo } from '../../../../helpers/utils';
import { currencies } from '../../../../common/data';
import { CalcType } from '../types';
import exchange from '../store';

import {
	Container,
	InfoLeft,
	InfoRight,
	InputWrapper,
} from './CalcBlock.styled';
import app from '../../../store';

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

	const values = exchange.values;
	const currentQuantity = values[type].quantity;

	const {
		code: currencyCode,
		symbol: currencySymbol,
	} = values[type].currency;

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

	const balanceText = useMemo(() => {
		const currencyBalance = app.balance[currencyCode];

		return (
			`You have ${ currencySymbol }${ currencyBalance }`
		);
	}, [currencyCode, currencySymbol]);

	const rateText = useMemo(() => {
		const { symbol: fromSymbol } = values.from.currency;
		const { symbol: toSymbol } = values.to.currency;

		if (isNil(exchange.rate)) {
			return 'loading...';
		}

		return `${ fromSymbol }1 = ${ toSymbol }${ roundTo(exchange.rate, 2) }`;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exchange.rate, currencyCode]);

	const isQntDisabled = values.from.currency.code === values.to.currency.code;
	const isRateLoading = isNil(exchange.rate);

	return (
		<Container calcType={ type }>
			<InputWrapper
				isDisabled={ false }
				isLoading={ isRateLoading }
				hasInvalidValue={ false }
			>
				<Dropdown<Currency>
					defaultOption={ defaultOption }
					options={ currencyOptions }
					onChange={ onCurrencyChange }
				/>
				<InfoLeft>{ balanceText }</InfoLeft>

			</InputWrapper>

			<InputWrapper
				isDisabled={ isQntDisabled }
				isLoading={ isRateLoading }
				hasInvalidValue={ !exchange.canBeSubmitted }
			>
				<Input
					type="float2"
					onChange={ onQuantityChange }
					initialValue={ exchange.values[type].quantity }
					onControlsReady={ setupInputControls }
					isDisabled={ isQntDisabled }
				/>
				<InfoRight>{ rateText }</InfoRight>
			</InputWrapper>

		</Container>
	);
});

export default CalcBlock;
