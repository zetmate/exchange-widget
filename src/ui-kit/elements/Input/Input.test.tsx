import React from 'react';
import {
	cleanup,
	findByPlaceholderText,
	waitFor,
} from '@testing-library/react';

import '@testing-library/jest-dom';
import { Simulate } from 'react-dom/test-utils';

import { renderWithDeps } from '../../../helpers';
import Input from './index';

describe('Input component', () => {

	afterEach(() => {
		cleanup();
	});

	it('Should render without errors', () => {

		const { container } = renderWithDeps(<Input />);
		expect(container).toBeDefined();
	});

	it('Should set initial value if specified', async () => {

		const { container } = renderWithDeps(
			<Input
				placeholder="test"
				initialValue="value"
			/>,
		);

		const input = await findByPlaceholderText(
			container,
			'test',
		) as HTMLInputElement;

		expect(input.value).toBe('value');
	});

	it('Should change value when onChange event occurs', async () => {

		const { container } = renderWithDeps(<Input placeholder="test" />);

		const input = await findByPlaceholderText(
			container,
			'test',
		) as HTMLInputElement;

		// Enter some value
		input.value = 'new';
		Simulate.change(input);

		// Try to find new value in the dom
		await waitFor(() => expect(input.value).toBe('new'));
	});

	it('Should not change value if doesnt match regex', async () => {

		const { container } = renderWithDeps(
			<Input placeholder="test" type="int" initialValue={ 5 } />,
		);

		const input = await findByPlaceholderText(
			container,
			'test',
		) as HTMLInputElement;

		// Enter some invalid value
		input.value = 'new';
		Simulate.change(input);

		// Value should be changed back to 5
		await waitFor(() => expect(input.value).toBe('5'));
	});

	it('Should be possible to change value via controls object', async () => {

		const { container } = renderWithDeps(
			<Input
				placeholder="test"
				onControlsReady={ controls => {
					controls.setValue('from controls');
				} }
			/>,
		);

		const input = await findByPlaceholderText(
			container,
			'test',
		) as HTMLInputElement;

		// Try to find new value in the dom
		await waitFor(() => expect(input.value).toBe('from controls'));
	});
});
