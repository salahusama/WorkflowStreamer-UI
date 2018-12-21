import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { logIn } from '../actions/app';
import Page from './Page';

class App extends Component {
    constructor(props) {
        super(props);
        this.submitLoginDetails = this.submitLoginDetails.bind(this);
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
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);