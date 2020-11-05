import React, { useEffect } from 'react';

import CalcBlock from './CalcBlock';
import { Container } from './Exchange.styled';
import exchange from './store';

const ExchangeScreen = React.memo(() => {

	useEffect(() => {
		exchange.startUpdatingRates();

		return () => exchange.stopUpdatingRates();
	}, []);

	return (
		<Container>
			<CalcBlock type="from" />
			<CalcBlock type="to" />
		</Container>
	);
});

ExchangeScreen.displayName = 'ExchangeScreen';

export default ExchangeScreen;
