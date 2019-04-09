import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, Button, Intent } from "@blueprintjs/core";
import { logIn, restoreSession } from '../actions/app';
import Status from '../constants/status';

class LoginPage extends PureComponent {
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

    componentDidMount() {
        this.props.restoreSession();
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
        this.props.logIn(this.state.form);
    }

    render() {
        const { status, location } = this.props;
        const { signup } = this.state.form;
        const isPending = status === Status.PENDING;
        const formAction = signup ? 'Sign Up' : 'Log In';

        if (status === Status.SUCCESS) {
            return <Redirect to={location.from || '/'} />
        }

        return (
            <div className="flex-col" style={{ marginTop: '15vh' }}>
                <div className="flex-row">
                    <form onSubmit={this.logIn}>
                        <FormGroup label={formAction} labelFor="text-input">
                        {signup &&
                            <InputGroup onChange={(e) => this.handleFormChange(e, 'email')} disabled={isPending} leftIcon="envelope" large={true} type="email" placeholder="Email" style={{ marginBottom: '10px' }} autoFocus required />
                        }
                            <InputGroup onChange={(e) => this.handleFormChange(e, 'username')} disabled={isPending} leftIcon="user" large={true} type="text" placeholder="Username" style={{ marginBottom: '10px' }} autoFocus required />
                            <InputGroup onChange={(e) => this.handleFormChange(e, 'password')} disabled={isPending} leftIcon="lock" large={true} type="password" placeholder="Password" style={{ marginBottom: '10px' }} required />
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

LoginPage.propTypes = {
    logIn: PropTypes.func.isRequired,
    restoreSession: PropTypes.func.isRequired,
    state: PropTypes.string,
};

const mapStateToProps = state => ({
    status: state.auth.status,
})

const mapDispatchToProps = dispatch => ({
    logIn: details => dispatch(logIn(details)),
    restoreSession: () => dispatch(restoreSession()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
