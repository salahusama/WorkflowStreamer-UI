import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, Button, Intent } from "@blueprintjs/core";
import Status from '../constants/status';

class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.toggleSignUp = this.toggleSignUp.bind(this);
        this.state = {
            form: {
                email: null,
                username: null,
                password: null,
                signup: false,
            }
        }
    }

    handleFormChange(event, field) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                [field]: event.target.value,
            }
        });
    }

    toggleSignUp() {
        const { form, form: { signup } } = this.state;
        this.setState({
            form: {
                ...form,
                signup: !signup,
            },
        });
    }

    logIn(e) {
        e.preventDefault();
        this.setState({ didSubmit: true });
        this.props.onSubmit(this.state.form);
    }

    render() {
        const { status } = this.props;
        const { signup } = this.state.form;
        const isPending = status === Status.PENDING;
        const formAction = signup ? 'Sign Up' : 'Log In';

        return (
            <div className="flex-col" style={{ marginTop: '15vh' }}>
                <div className="flex-row">
                    <form onSubmit={this.logIn}>
                        <FormGroup label={formAction} labelFor="text-input">
                        {signup &&
                            <InputGroup onChange={(e) => this.handleFormChange(e, 'email')} disabled={isPending} leftIcon="envelope" large={true} type="email" placeholder="Email" style={{ marginBottom: '10px' }} autoFocus required />
                        }
                            <InputGroup onChange={(e) => this.handleFormChange(e, 'username')} disabled={isPending} leftIcon="user" large={true} type="text" placeholder="Username" style={{ marginBottom: '10px' }} autoFocus required />
                            <InputGroup onChange={(e) => this.handleFormChange(e, 'password')} disabled={isPending} leftIcon="lock" large={true} type="password" placeholder="Password" style={{ marginBottom: '10px' }} />
                            <Button type="submit" loading={isPending} icon="log-in" intent={Intent.PRIMARY}>{formAction}</Button>
                            <Button className="alt-action-text" minimal={true} disabled={isPending} onClick={this.toggleSignUp}>
                                {signup ? 'Log In' : 'Sign Up'}
                            </Button>
                        </FormGroup>
                    </form>
                </div>
            </div>
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
