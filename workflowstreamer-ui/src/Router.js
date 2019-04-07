import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import AnalyticsPage from "./components/analytics/AnalyticsPage";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginPage";
import TeamsPage from "./components/teams/TeamsPage";

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to="/app" />
				<Route path="/login" component={LoginForm} />
				<PrivateRoute path="/app" component={App} />
				<PrivateRoute path="/analytics" component={AnalyticsPage} />
				<PrivateRoute path="/teams" component={TeamsPage} />
			</Switch>
		</BrowserRouter>
	);
}
