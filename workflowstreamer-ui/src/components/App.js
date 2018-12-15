import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import Tasks from './Tasks';
import { logIn } from '../actions/app';

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

        // TODO: Show error messages if exist

        if (!user) {
                return (
                <div className="flex-col" style={{ marginTop: '15vh' }}>
                    <div className="flex-row">
                        <LoginForm onSubmit={this.submitLoginDetails} />
                    </div>
                </div>
            );
        } else {
            return (
                <Tasks />
            );
        }
    }
}

App.propTypes = {
    logIn: PropTypes.func.isRequired,
    user: PropTypes.object,
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
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