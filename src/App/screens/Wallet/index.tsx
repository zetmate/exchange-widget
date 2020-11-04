import React from 'react';

import { Carousel } from '../../../ui-kit/elements';
import Dropdown from '../../../ui-kit/elements/Dropdown';

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
			<Dropdown<string>
				options={ [
					{ value: 'la', display: 'la' },
					{ value: 'lala', display: 'lala' },
					{ value: 'blah', display: 'blah' },
				] }
			/>
			<div>
				kek
			</div>
		</>
	);
});

WalletScreen.displayName = 'WalletScreen';
export default WalletScreen;
