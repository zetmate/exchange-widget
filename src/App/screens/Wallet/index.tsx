import React from 'react';

import { Carousel, Input } from '../../../ui-kit/elements';

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
			<Input type="float2" />
		</>
	);
});

WalletScreen.displayName = 'WalletScreen';
export default WalletScreen;
