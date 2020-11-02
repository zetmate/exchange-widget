import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import { ICarouselStore } from '../store';
import { Dot } from './DotButton.styled';

type Props = {
	index: number;
	store: ICarouselStore;
}

/*
 * Constants
 */
const DOT_BUTTON_TEST_ID = 'carousel__dot';

/**
 * Dot Button for carousel component
 */
const DotButton: React.FC<Props> = observer(({ index, store }) => {

	const isActive = store.currentIndex === index;

	const onClick = useCallback(() => {
		store.switchTo(index);
	}, [store, index]);

	return (
		<Dot
			data-testid={ DOT_BUTTON_TEST_ID }
			isActive={ isActive }
			onClick={ onClick }
		/>
	);
});

DotButton.displayName = 'DotButton';

export {
	Props as DotButtonProps,
	DOT_BUTTON_TEST_ID,
};

export default DotButton;
