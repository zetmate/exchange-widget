import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App, { routes } from './App';

// Styles
import './styles/css/index.css';
import GlobalStyles from './styles/GlobalStyles';
import { mainTheme } from './styles/theme';

/**
 * Root component with contexts and other utils wrappers
 */
const Root: React.FC = React.memo(() => {

	return (
		<HashRouter basename={ routes.index }>
			<ThemeProvider theme={ mainTheme }>
				<GlobalStyles />
				<App />
			</ThemeProvider>
		</HashRouter>
	);
});

Root.displayName = 'Root';

// Render
ReactDOM.render(<Root />, document.getElementById('app'));
