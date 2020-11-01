import React, { useMemo, useState } from 'react';

import { Dot, ButtonsContainer } from './Carousel.styled';

type Props = {
	/**
	 * Quantity of items in carousel
	 */
	numItems: number;

	/**
	 * Render function
	 * @param currentIndex - index of the currently showed item
	 */
	render(currentIndex: number): JSX.Element
}

/**
 * Carousel component
 */
const Carousel: React.FC<Props> = React.memo((props) => {

	const { numItems, render } = props;
	const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);

	// Dot buttons
	const dots = useMemo(() => {
		const arr: JSX.Element[] = [];

		for (let i = 0; i < numItems; i++) {
			arr.push(
				<Dot
					key={ i }
					onClick={ () => setCurrentItemIndex(i) }
				/>,
			);
		}
		return arr;
	}, [numItems]);

	return (
		<>
			{ render(currentItemIndex) }

			<ButtonsContainer>
				{ dots }
			</ButtonsContainer>
		</>
	);
});

Carousel.displayName = 'Carousel';

export { Props as CarouselProps };
export default Carousel;
