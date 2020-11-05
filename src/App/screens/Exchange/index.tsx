import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import routes from '../routes';
import CalcBlock from './CalcBlock';
import { ButtonsContainer, Container, Submit } from './Exchange.styled';
import exchange from './store';

const ExchangeScreen = React.memo(() => {

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
				>
					Exchange
				</Submit>
			</ButtonsContainer>

			<CalcBlock type="from" />
			<CalcBlock type="to" />

		</Container>
	);
});

ExchangeScreen.displayName = 'ExchangeScreen';

export default ExchangeScreen;
