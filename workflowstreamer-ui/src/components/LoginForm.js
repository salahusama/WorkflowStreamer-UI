import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, Button, Intent } from "@blueprintjs/core";
import AppToaster from '../utils/AppToaster';
import Status from '../constants/status';

class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            form: {
                username: null,
                password: null,
            }
        }
    }

    componentWillUnmount() {
        AppToaster.show({
            message: "Login Successful",
            intent: Intent.SUCCESS,
        })
    }

    handleUsernameChange(event) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                username: event.target.value,
            }
        });
    }

    handlePasswordChange(event) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                password: event.target.value,
            }
        });
    }

    logIn(e) {
        e.preventDefault();
        this.setState({ didSubmit: true });
        this.props.onSubmit(this.state.form);
    }

    render() {
        const { status } = this.props;
        const isPending = status === Status.PENDING;

        return (
            <form onSubmit={this.logIn}>
                <FormGroup label="Login" labelFor="text-input">
                    <InputGroup onChange={this.handleUsernameChange} disabled={isPending} leftIcon="user" large={true} type="text" placeholder="Username" style={{ marginBottom: '10px' }} autoFocus />
                    <InputGroup onChange={this.handlePasswordChange} disabled={isPending} leftIcon="lock" large={true} type="password" placeholder="Password" style={{ marginBottom: '10px' }} />
                    <Button type="submit" loading={isPending} icon="log-in" intent={Intent.PRIMARY}>Log In</Button>
                </FormGroup>
            </form>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    state: PropTypes.string,
};

export default connect(state => ({
    status: state.auth.status,
}))(LoginForm);
