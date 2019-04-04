import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import AnalyticsPage from "./components/analytics/AnalyticsPage";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginPage";

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to="/login" />
				<Route path="/login" component={LoginForm} />
				<PrivateRoute path="/:teamId/app" component={App} />
				<PrivateRoute path="/:teamId/analytics" component={AnalyticsPage} />
			</Switch>
		</BrowserRouter>
	);
}
