import React, { useMemo } from 'react';
import { observer } from 'mobx-react';

import { Carousel } from '../../../ui-kit/elements';
import { currencies, currenciesArr } from '../../../common/data';
import { roundTo } from '../../../helpers/utils';
import app from '../../store';
import { BalanceContainer, Container } from './Wallet.styled';

/**
 * Wallet Screen component
 */
const WalletScreen: React.FC = observer(() => {

	const balanceItems = useMemo(() => (
		currenciesArr.map(code => (
			`${ currencies[code].symbol }.${ roundTo(app.balance[code], 2) }`
		))
	), []);

	return (
		<Container>
			<BalanceContainer>
				<Carousel items={ balanceItems } />
			</BalanceContainer>
		</Container>
	);
});

WalletScreen.displayName = 'WalletScreen';
export default WalletScreen;
