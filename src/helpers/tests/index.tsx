import React, { ReactElement } from 'react';
import { AxiosInstance } from 'axios';
import { render, RenderOptions } from '@testing-library/react';

import { GlobalDependencies } from '../../common';

/**
 * Wrapper to RTL render, enables all global dependencies
 * @param ui
 * @param options
 */
const renderWithDeps = (
	ui: ReactElement,
	options?: RenderOptions,
): ReturnType<typeof render> => (
	render(
		(
			<GlobalDependencies>
				{ ui }
			</GlobalDependencies>
		),
		options,
	)
);

/**
 * Utils used in test environment
 */
type TestUtils = {
	mockAxios: AxiosInstance;
}
const testUtils: TestUtils = {
	mockAxios: null,
};

export {
	renderWithDeps,
	testUtils,
};
