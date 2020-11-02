import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';

import { useTheme } from '../../../styles/theme';
import CaretIcon from '../../icons/Caret';

import {
	ArrowContainer,
	ContentContainer,
	DotsContainer,
	SelfContainer,
} from './Carousel.styled';

import { CarouselStore } from './store';
import DotButton from './DotButton';

type Props = {
	/**
	 * List of elements in carousel
	 */
	items: JSX.Element[];

	/**
	 * ItemsContainer
	 */
	ItemsContainer?: React.FC;
}

const defaultProps: Partial<Props> = {
	ItemsContainer: ContentContainer,
};

/**
 * Carousel component
 */
const Carousel: React.FC<Props> = observer((props) => {

	const { items, ItemsContainer } = props;
	const theme = useTheme();

	// NB: will be created once, during the first render
	const store = useMemo(() => (
		new CarouselStore(items.length)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	), []);

	// Update carousel size
	useEffect(() => {
		store.setSize(items.length);

	}, [items.length, store]);

	// Dot buttons
	const dots = useMemo(() => {
		const arr: JSX.Element[] = [];

		for (let i = 0; i < items.length; i++) {
			arr.push(
				<DotButton
					key={ i }
					index={ i }
					store={ store }
				/>,
			);
		}
		return arr;
	}, [items.length, store]);

	const caretProps = useMemo(() => ({
		size: '100%',
		color: theme.colors.transparentWhite,
	}), [theme]);

	return (
		<>
			<SelfContainer>
				<ArrowContainer onClick={ store.prev.bind(store) }>
					<CaretIcon
						{ ...caretProps }
						direction="left"
					/>
				</ArrowContainer>

				<ItemsContainer>
					{ items[store.currentIndex] }
				</ItemsContainer>

				<ArrowContainer onClick={ store.next.bind(store) }>
					<CaretIcon
						{ ...caretProps }
						direction="right"
					/>
				</ArrowContainer>

			</SelfContainer>

			<DotsContainer>
				{ dots }
			</DotsContainer>
		</>
	);
});

Carousel.displayName = 'Carousel';
Carousel.defaultProps = defaultProps;

export { Props as CarouselProps };
export default Carousel;
