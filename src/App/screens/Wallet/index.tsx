import React, { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';

import { Carousel } from '../../../ui-kit/elements';
import { ExchangeIcon } from '../../../ui-kit/icons';
import { currencies, currenciesArr } from '../../../common/data';
import { roundTo } from '../../../helpers/utils';
import { CurrencyCode } from '../../../types';
import app from '../../store';
import routes from '../routes';
import History from './History';

import {
	BalanceContainer,
	Container,
	ExchangeBtn,
} from './Wallet.styled';

/**
 * Wallet Screen component
 */
const WalletScreen: React.FC = observer(() => {

	const [currency, setCurrency] = useState<CurrencyCode>();
	const history = useHistory();
	/**
	 * Items for balance carousel component
	 */
	const balanceItems = useMemo(() => (
		currenciesArr.map(code => (
			`${ currencies[code].symbol }.${ roundTo(app.balance[code], 2) }`
		))
	), []);

	const onCurrencySelect = useCallback((index: number) => {
		setCurrency(currenciesArr[index]);
	}, []);

	/**
	 * Navigate to exchange screen
	 */
	const navigateToExchange = useCallback(() => {
		history.replace(routes.exchange);
	}, [history]);

	return (
		<Container>
			<ExchangeBtn onClick={ navigateToExchange }>
				<ExchangeIcon size="6vmin" />
				Exchange
			</ExchangeBtn>

			<BalanceContainer>
				<Carousel
					items={ balanceItems }
					onChange={ onCurrencySelect }
				/>
			</BalanceContainer>

			<History currency={ currency } />
		</Container>
	);
});

WalletScreen.displayName = 'WalletScreen';
export default WalletScreen;
