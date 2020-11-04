import React from 'react';
import { cleanup, findByTestId, findByText } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

import { renderWithDeps } from '../../../helpers';
import { DOT_BUTTON_TEST_ID } from './DotButton';

import Carousel, {
	DOT_CONTAINER_TEST_ID,
	LEFT_ARROW_TEST_ID,
	RIGHT_ARROW_TEST_ID,
} from './index';

describe('Carousel component', () => {

	afterEach(() => {
		cleanup();
	});

	const items = ['one', 'two', 'three'];

	it('Should render without errors', () => {

		const { container } = renderWithDeps(
			<Carousel
				items={ items }
			/>,
		);

		expect(container).toBeDefined();
	});

	it('Number of dots should match items length', async () => {

		const { container } = renderWithDeps(
			<Carousel
				items={ items }
			/>,
		);

		const dotsContainer = await findByTestId(
			container,
			DOT_CONTAINER_TEST_ID,
		);

		const dots = dotsContainer.querySelectorAll(
			`[data-testid=${ DOT_BUTTON_TEST_ID }]`,
		);

		expect(dots.length).toBe(items.length);
	});

	it('Should show first item by default', async () => {

		const { container } = renderWithDeps(
			<Carousel
				items={ items }
			/>,
		);

		const item = await findByText(container, items[0]);

		expect(item).toBeInTheDocument();
	});

	it('Should show item with the same index when dot is clicked', async () => {

		const { container } = renderWithDeps(
			<Carousel
				items={ items }
			/>,
		);

		const dotsContainer = await findByTestId(
			container,
			DOT_CONTAINER_TEST_ID,
		);

		const dots = dotsContainer.querySelectorAll(
			`[data-testid=${ DOT_BUTTON_TEST_ID }]`,
		);

		const index = 2;

		Simulate.click(dots[index]);

		const item = await findByText(container, items[index]);

		expect(item).toBeInTheDocument();
	});

	it('Should show previous item on left arrow click', async () => {

		const { container } = renderWithDeps(
			<Carousel
				items={ items }
			/>,
		);

		const arrow = await findByTestId(
			container,
			LEFT_ARROW_TEST_ID,
		);

		Simulate.click(arrow);

		const item = await findByText(container, items[items.length - 1]);

		expect(item).toBeInTheDocument();
	});

	it('Should show next item on right arrow click', async () => {

		const { container } = renderWithDeps(
			<Carousel
				items={ items }
			/>,
		);

		const arrow = await findByTestId(
			container,
			RIGHT_ARROW_TEST_ID,
		);

		Simulate.click(arrow);

		const item = await findByText(container, items[1]);

		expect(item).toBeInTheDocument();
	});
});
