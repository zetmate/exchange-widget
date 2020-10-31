import React from 'react';
import { Redirect } from 'react-router';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './screens/routes';

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
		<Router basename={ routes.index }>
			<Switch>
				<Route
					exact
					path={ routes.index }
					component={ IndexRedirect }
				/>
				<Route
					exact
					path={ routes.wallet }
					component={ () => <div>Wallet</div> }
				/>
				<Route
					exact
					path={ routes.exchange }
					component={ () => <div>Exchange</div> }
				/>
			</Switch>
		</Router>
	);
});

App.displayName = 'App';
export default App;
