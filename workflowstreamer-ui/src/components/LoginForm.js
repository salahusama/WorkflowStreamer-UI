import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, Button, Intent } from "@blueprintjs/core";

class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            didSubmit: false,
            form: {
                username: null,
                password: null,
            }
        }
    }

    handleUsernameChange(event) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                username: event.target.value
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

    logIn() {
        this.setState({ didSubmit: true });
        this.props.onSubmit(this.state.form);
    }

    render() {
        const { didSubmit } = this.state;

        return (
            <FormGroup label="Login" labelFor="text-input">
                <InputGroup onChange={this.handleUsernameChange} disabled={didSubmit} leftIcon="user" large={true} type="text" placeholder="Username" style={{ marginBottom: '10px' }} />
                <InputGroup onChange={this.handlePasswordChange} disabled={didSubmit} leftIcon="lock" large={true} type="password" placeholder="Password" style={{ marginBottom: '10px' }} />
                <Button loading={didSubmit} icon="log-in" intent={Intent.PRIMARY} onClick={this.logIn}>Log In</Button>
            </FormGroup>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default LoginForm;
