import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { logIn, restoreSession } from '../actions/app';
import Page from './Page';

class App extends Component {
    constructor(props) {
        super(props);
        this.submitLoginDetails = this.submitLoginDetails.bind(this);
    }

    componentDidMount() {
        this.props.restoreSession();
    }

    submitLoginDetails(details) {
        this.props.logIn(details);
    }

    render() {
        const { user } = this.props;

        return (
            user
            ? <Page />
            : <LoginForm onSubmit={this.submitLoginDetails} />
        );
    }
}

App.propTypes = {
    logIn: PropTypes.func.isRequired,
    restoreSession: PropTypes.func.isRequired,
    user: PropTypes.object,
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logIn: details => dispatch(logIn(details)),
        restoreSession: () => dispatch(restoreSession()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);