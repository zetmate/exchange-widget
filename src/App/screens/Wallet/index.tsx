import React from 'react';

import { Carousel } from '../../../ui-kit/elements';

const items = ['one', 'two', 'three'];

/**
 * Wallet Screen component
 */
const WalletScreen: React.FC = React.memo(() => {
	return (
		<>
			<div style={ { height: '50%' } }>
				<Carousel items={ items } />
			</div>
		</>
	);
});

WalletScreen.displayName = 'WalletScreen';
export default WalletScreen;
