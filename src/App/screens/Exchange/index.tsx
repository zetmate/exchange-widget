import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react';

import routes from '../routes';
import CalcBlock from './CalcBlock';
import { ButtonsContainer, Container, Submit } from './Exchange.styled';
import exchange from './store';

/*
 * Test constants
 */
const BLOCK_FROM_TEST_ID = 'exchange__block-from';
const BLOCK_TO_TEST_ID = 'exchange__block-to';
const SUBMIT_TEST_ID = 'exchange__submit';

/**
 * Exchange screen component
 */
const ExchangeScreen: React.FC = observer(() => {

	const history = useHistory();
	const [width, setWidth] = useState<string>();
	const selfRef = useRef<HTMLDivElement>();

	// Start updating rates
	useEffect(() => {
		exchange.startUpdatingRates();

		return () => exchange.stopUpdatingRates();
	}, []);

	// Determine width of the container (need for position absolute)
	useEffect(() => {
		// Do nothing if ref is not defined
		if (!selfRef.current) {
			return;
		}
		const computed = getComputedStyle(selfRef.current)?.width;
		setWidth(computed);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selfRef.current]);

	// On cancel button click
	const onCancel = useCallback(() => {
		history.replace(routes.wallet);

	}, [history]);

	// On Exchange button click
	const onSubmit = useCallback(() => {
		// Do nothing if can not be submitted
		if (!exchange.canBeSubmitted) {
			return;
		}

		exchange.submit();
		history.replace(routes.wallet);

	}, [history]);

	return (
		<Container ref={ selfRef }>

			<ButtonsContainer width={ width }>
				<p onClick={ onCancel }>
					Cancel
				</p>
				<Submit
					isDisabled={ !exchange.canBeSubmitted }
					onClick={ onSubmit }
					data-testid={ SUBMIT_TEST_ID }
				>
					Exchange
				</Submit>
			</ButtonsContainer>

			<CalcBlock
				type="from"
				testId={ BLOCK_FROM_TEST_ID }
			/>
			<CalcBlock
				type="to"
				testId={ BLOCK_TO_TEST_ID }
			/>

		</Container>
	);
});

ExchangeScreen.displayName = 'ExchangeScreen';

export {
	BLOCK_FROM_TEST_ID,
	BLOCK_TO_TEST_ID,
	SUBMIT_TEST_ID,
};

export default ExchangeScreen;
