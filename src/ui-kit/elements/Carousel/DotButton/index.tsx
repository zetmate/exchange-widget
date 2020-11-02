import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import { ICarouselStore } from '../store';
import { Dot } from './DotButton.styled';

type Props = {
	index: number;
	store: ICarouselStore;
}

const DotButton: React.FC<Props> = observer(({ index, store }) => {

	const isActive = store.currentIndex === index;

	const onClick = useCallback(() => {
		store.switchTo(index);
	}, [store, index]);

	return (
		<Dot
			isActive={ isActive }
			onClick={ onClick }
		/>
	);
});

DotButton.displayName = 'DotButton';

export { Props as DotButtonProps };
export default DotButton;
