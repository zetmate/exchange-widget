import React from 'react';
import mockAxios from 'jest-mock-axios';

import {
	cleanup,
	findByText,
	findByTestId,
	waitFor,
	getByTestId,
} from '@testing-library/react';

import { Simulate } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

import { DD_FIELD_TEST_ID } from '../../../ui-kit/elements';
import { renderWithDeps } from '../../../helpers';
import { RatesResponse } from '../../../types';
import app from '../../store';
import exchange from './store';

import ExchangeScreen, {
	BLOCK_FROM_TEST_ID,
	BLOCK_TO_TEST_ID, SUBMIT_TEST_ID,
} from './index';

/*
 * API mocks
 */
const rates: RatesResponse['rates'] = {
	USD: 2,
	EUR: 3,
	GBP: 4,
};
const ratesResponse = {
	status: 200,
	data: { rates } as RatesResponse,
};

describe('Exchange screen', () => {

	afterEach(() => {
		cleanup();
		mockAxios.reset();
	});

	it('Should render without errors', () => {

		const { container } = renderWithDeps(<ExchangeScreen />);
		expect(container).toBeDefined();
	});

	it('Should recalculate quantity onChange', async () => {

		const { container } = renderWithDeps(<ExchangeScreen />);

		// Declare constants
		const toCurr = exchange.values.to.currency.code;

		const quantityFrom = 50;
		const expectedQuantityTo = rates[toCurr] * quantityFrom;

		// Mock rates
		mockAxios.mockResponse(ratesResponse);

		// Get input fields
		const fromBlock = await findByTestId(container, BLOCK_FROM_TEST_ID);
		const fromInput = fromBlock.getElementsByTagName('input')[0];

		const toBlock = await findByTestId(container, BLOCK_TO_TEST_ID);
		const toInput = toBlock.getElementsByTagName('input')[0];

		// Change the "from" quantity
		fromInput.value = quantityFrom.toString();
		Simulate.change(fromInput);

		// Expect "to" quantity to change
		await waitFor(() => {
			expect(toInput.value).toBe(expectedQuantityTo.toString());
		});

	});

	it('Should re-fetch rates when base currency is changed', async () => {

		const { container } = renderWithDeps(<ExchangeScreen />);

		// Mock rates
		mockAxios.mockResponse(ratesResponse);

		// Change base currency to USD
		const fromBlock = await findByTestId(container, BLOCK_FROM_TEST_ID);
		const dropdown = await findByTestId(fromBlock, DD_FIELD_TEST_ID);
		Simulate.click(dropdown);

		const option = await findByText(fromBlock, 'USD');
		Simulate.click(option);

		// Expect rates to be fetched for new base currency
		await waitFor(() => {
			const requestQueryParams = mockAxios.lastReqGet()?.config.params;

			expect(requestQueryParams?.base).toBe('USD');
		});

	});

	it('Should change rate when "to" currency is changed', async () => {

		const { container } = renderWithDeps(<ExchangeScreen />);

		// Mock rates
		mockAxios.mockResponse(ratesResponse);

		// Change"to" currency to USD
		const block = await findByTestId(container, BLOCK_TO_TEST_ID);
		const dropdown = await findByTestId(block, DD_FIELD_TEST_ID);
		Simulate.click(dropdown);

		const option = await findByText(block, 'USD');
		Simulate.click(option);

		// Expect USD rate to be set
		await waitFor(() => {
			expect(exchange.rate).toBe(rates.USD);
		});

	});

	it('Should disable inputs if same currency is chosen', async () => {

		const { container } = renderWithDeps(<ExchangeScreen />);

		// Code of the currency "from"
		const currFrom = exchange.values.from.currency.code;

		// Find blocks
		const fromBlock = await findByTestId(container, BLOCK_FROM_TEST_ID);
		const toBlock = await findByTestId(container, BLOCK_TO_TEST_ID);

		// Find Inputs
		const fromInput = fromBlock.getElementsByTagName('input')[0];
		const toInput = toBlock.getElementsByTagName('input')[0];

		// Expect inputs to be enabled by default
		expect(fromInput.disabled).toBe(false);
		expect(toInput.disabled).toBe(false);

		// Select same currency
		const dropdown = await findByTestId(toBlock, DD_FIELD_TEST_ID);
		Simulate.click(dropdown);

		const option = await findByText(toBlock, currFrom);
		Simulate.click(option);

		// Check if inputs are disabled
		await waitFor(() => {
			expect(fromInput.disabled).toBe(true);
			expect(toInput.disabled).toBe(true);
		});
	});

	it('Should be impossible to submit when quantity = 0', async () => {

		const { container } = renderWithDeps(<ExchangeScreen />);

		// Spy on submit function
		const submitSpy = jest.fn();
		const originalSubmit = exchange.submit.bind(exchange);

		exchange.submit = () => {
			submitSpy();
			originalSubmit();
		};

		// Find input
		const fromBlock = await findByTestId(container, BLOCK_FROM_TEST_ID);
		const fromInput = fromBlock.getElementsByTagName('input')[0];

		// Set 0 quantity
		fromInput.value = '0';
		Simulate.change(fromInput);

		// Try to submit results
		const submit = getByTestId(container, SUBMIT_TEST_ID);
		Simulate.click(submit);

		// Submit should not be called
		expect(submitSpy).not.toBeCalled();
	});

	it('Should push 2 new records to history on submit', async () => {

		const { container } = renderWithDeps(<ExchangeScreen />);

		// Get initial number of records
		const fromCurr = exchange.values.from.currency.code;
		const toCurr = exchange.values.to.currency.code;

		const initialNumRecords = {
			to: app.history[toCurr].length,
			from: app.history[fromCurr].length,
		};

		// Mock rates
		mockAxios.mockResponse(ratesResponse);

		// Type a quantity
		const toBlock = await findByTestId(container, BLOCK_TO_TEST_ID);
		const toInput = toBlock.getElementsByTagName('input')[0];

		toInput.value = '50';
		Simulate.change(toInput);

		// Submit
		const submit = getByTestId(container, SUBMIT_TEST_ID);
		Simulate.click(submit);

		// Expect history to have 2 new records
		const expected = {
			to: initialNumRecords.to + 1,
			from: initialNumRecords.from + 1,
		};

		await waitFor(() => {

			expect(app.history[toCurr].length).toBe(expected.to);
			expect(app.history[fromCurr].length).toBe(expected.from);
		});
	});

	it('Should update balance on submit', async () => {

		const { container } = renderWithDeps(<ExchangeScreen />);
		const quantity = 50;

		// Get initial number of records
		const fromCurr = exchange.values.from.currency.code;
		const toCurr = exchange.values.to.currency.code;

		const initialBalance = {
			from: app.balance[fromCurr],
			to: app.balance[toCurr],
		};

		// Mock rates
		mockAxios.mockResponse(ratesResponse);

		// Type a quantity
		const fromBlock = await findByTestId(container, BLOCK_FROM_TEST_ID);
		const fromInput = fromBlock.getElementsByTagName('input')[0];

		fromInput.value = quantity.toString();
		Simulate.change(fromInput);

		// Submit
		const submit = getByTestId(container, SUBMIT_TEST_ID);
		Simulate.click(submit);

		// Check balance
		const expectedBalance = {
			from: initialBalance.from - quantity,
			to: initialBalance.to + quantity * rates[toCurr],
		};

		await waitFor(() => {

			expect(app.balance[fromCurr]).toBe(expectedBalance.from);
			expect(app.balance[toCurr]).toBe(expectedBalance.to);
		});
	});
});

