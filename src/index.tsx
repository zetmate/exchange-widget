import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import './styles/css/index.css';
import GlobalStyles from './styles/GlobalStyles';
import { mainTheme } from './styles/theme';

// Components
import App, { routes } from './App';
import { GlobalDependencies } from './common';

/**
 * Root component with contexts and other utils wrappers
 */
const Root: React.FC = React.memo(() => {

	return (
		<GlobalDependencies
			theme={ mainTheme }
			indexRoute={ routes.index }
		>
			<GlobalStyles />
			<App />
		</GlobalDependencies>
	);
});

Root.displayName = 'Root';

// Render
ReactDOM.render(<Root />, document.getElementById('app'));
