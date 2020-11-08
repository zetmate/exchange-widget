import React from 'react';

import {
	cleanup,
	findByText,
	findByTestId,
	waitFor,
} from '@testing-library/react';

import { Simulate } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

import { noop, renderWithDeps } from '../../../helpers';
import { optionsTest } from './OptionsList';
import Dropdown, { DD_FIELD_TEST_ID } from './index';

describe('Dropdown component', () => {

	afterEach(() => {
		cleanup();
	});

	const options = [
		{ value: 1, display: 'one' },
		{ value: 2, display: 'two' },
		{ value: 3, display: 'three' },
	];

	it('Should render without errors', () => {

		const { container } = renderWithDeps(
			<Dropdown options={ [] } onChange={ noop } />,
		);
		expect(container).toBeDefined();
	});

	it('Should show placeholder if specified', async () => {

		const { container } = renderWithDeps(
			<Dropdown
				options={ [] }
				onChange={ noop }
				placeholder="Placeholder"
			/>,
		);

		const node = await findByText(container, 'Placeholder');
		expect(node).toBeInTheDocument();
	});

	it('Should show default option if specified', async () => {

		const { container } = renderWithDeps(
			<Dropdown
				options={ [] }
				onChange={ noop }
				defaultOption={ {
					value: null,
					display: 'option',
				} }
			/>,
		);

		const node = await findByText(container, 'option');
		expect(node).toBeInTheDocument();
	});

	it('Should open and close options on click', async () => {

		const { container } = renderWithDeps(
			<Dropdown
				options={ options }
				onChange={ noop }
			/>,
		);

		const field = await findByTestId(container, DD_FIELD_TEST_ID);
		Simulate.click(field);

		// Open
		const option = await findByText(container, 'three');
		expect(option).toBeInTheDocument();

		// Close
		Simulate.click(field);
		await waitFor(() => expect(option).not.toBeInTheDocument());
	});

	it('Should select option that has been clicked', async () => {

		const { container } = renderWithDeps(
			<Dropdown
				options={ options }
				onChange={ noop }
			/>,
		);

		const field = await findByTestId(container, DD_FIELD_TEST_ID);
		Simulate.click(field);

		// Open and find option
		const option = await findByText(container, 'three');
		expect(option).toBeInTheDocument();

		// Click it and check if it appeared in the field
		Simulate.click(option);
		const fieldValue = await findByText(field, 'three');

		expect(fieldValue).toBeInTheDocument();
	});

	it('Should pass option value to the onChange handler', async () => {

		const handler = jest.fn();

		const { container } = renderWithDeps(
			<Dropdown
				options={ options }
				onChange={ handler }
			/>,
		);

		const field = await findByTestId(container, DD_FIELD_TEST_ID);
		Simulate.click(field);

		// Open and find option
		const option = await findByText(container, 'two');
		expect(option).toBeInTheDocument();

		// Click it and wait for handler to be called
		Simulate.click(option);
		await waitFor(() => expect(handler).toBeCalledTimes(1));
		await waitFor(() => expect(handler).toBeCalledWith(2));
	});

	it('Should remove resize event listener after unmount', async () => {

		const spy = jest.fn();
		optionsTest.spy = spy;

		const { unmount } = renderWithDeps(
			<Dropdown
				options={ options }
				onChange={ noop }
			/>,
		);

		const event = new Event('resize');

		unmount();
		window.dispatchEvent(event);

		await waitFor(() => expect(spy).not.toBeCalled());
	});
});
