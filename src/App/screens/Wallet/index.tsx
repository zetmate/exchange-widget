import React from 'react';

import { Carousel } from '../../../ui-kit/elements';

/**
 * Wallet Screen component
 */
const WalletScreen: React.FC = React.memo(() => {
	return (
		<div>
			<Carousel
				numItems={ 3 }
				render={ index => <>{ index }</> }
			/>
		</div>
	);
});

WalletScreen.displayName = 'WalletScreen';
export default WalletScreen;
