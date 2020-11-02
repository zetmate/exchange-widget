import React, { ReactElement } from 'react';
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

export {
	renderWithDeps,
};
