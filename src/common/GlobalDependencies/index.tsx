import React from 'react';
import { Theme } from 'styled-system';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { mainTheme } from '../../styles/theme';

type Props = {
	indexRoute?: string;
	theme?: Theme;
}

const defaultProps: Partial<Props> = {
	indexRoute: '/',
	theme: mainTheme,
};

const GlobalDependencies: React.FC<Props> = React.memo(props => {

	const { children, theme, indexRoute } = props;

	return (
		<HashRouter basename={ indexRoute }>
			<ThemeProvider theme={ theme }>
				{ children }
			</ThemeProvider>
		</HashRouter>
	);
});

GlobalDependencies.displayName = 'GlobalDependencies';
GlobalDependencies.defaultProps = defaultProps;

export default GlobalDependencies;
