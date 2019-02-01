import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import AnalyticsPage from "./components/AnalyticsPage";

export default function Router() {
  return (
    <BrowserRouter>
        <Switch>
            <Redirect exact from="/" to="app" />
            <Route path="/app" component={App} />
            <Route path="/analytics" component={AnalyticsPage} />
        </Switch>
    </BrowserRouter>
  );
}