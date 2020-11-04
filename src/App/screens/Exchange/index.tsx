import React from 'react';

import CalcBlock from './CalcBlock';
import { Container } from './Exchange.styled';

const ExchangeScreen = React.memo(() => {

	return (
		<Container>
			<CalcBlock type="from" />
			<CalcBlock type="to" />
		</Container>
	);
});

ExchangeScreen.displayName = 'ExchangeScreen';

export default ExchangeScreen;
