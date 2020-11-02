import React from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import routes from './screens/routes';
import { WalletScreen } from './screens';
import { AppContainer } from './App.styled';

/**
 * Redirect to default route
 */
const IndexRedirect = () => (
	<Redirect to={ routes.wallet } />
);

/**
 * App component
 */
const App: React.FC = React.memo(() => {

	return (
		<AppContainer>
			<Switch>
				<Route
					exact
					path={ routes.index }
					component={ IndexRedirect }
				/>
				<Route
					exact
					path={ routes.wallet }
					component={ () => <WalletScreen /> }
				/>
				<Route
					exact
					path={ routes.exchange }
					component={ () => <div>Exchange</div> }
				/>
			</Switch>
		</AppContainer>
	);
});

App.displayName = 'App';

export { default as routes } from './screens/routes';
export default App;