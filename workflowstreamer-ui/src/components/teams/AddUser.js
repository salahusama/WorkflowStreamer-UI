import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Intent, Collapse, FormGroup, InputGroup } from '@blueprintjs/core';
import { addUserToTeam } from '../../actions/teamActions';

class AddUser extends PureComponent {
    constructor(props) {
        super(props);
        this.addUser = this.addUser.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.state = {
            isOpen: false,
            form: {
                email: null,
            },
        };
    }

    handleFormChange(event) {
        const { form } = this.state;
        const field = event.target.name;
        this.setState({
            form: {
                ...form,
                [field]: event.target.value,
            }
        });
    }

    toggleForm() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    addUser(e) {
        const { team: { teamId } } = this.props;
        const { form: { email } } = this.state;

        e.preventDefault();
        this.props.addUserToTeam(teamId, email);
        this.toggleForm();
    }

    render() {
        const { isOpen } = this.state;

        return (
            <Fragment>
                <Button
                    minimal={true}
                    icon={isOpen ? "remove" : "add"}
                    fill={true}
                    onClick={this.toggleForm}
                    intent={isOpen ? Intent.DANGER : Intent.SUCCESS}
                />

                <Collapse isOpen={isOpen}>
                    <form onSubmit={this.addUser}>
                        <FormGroup>
                            <InputGroup
                                name="email"
                                onChange={this.handleFormChange}
                                large={true}
                                type="text"
                                placeholder="User Email"
                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                autoFocus
                            />
                            <Button type="submit" intent={Intent.PRIMARY}>Add User To Team</Button>
                        </FormGroup>
                    </form>
                </Collapse>
            </Fragment>
        );
    }
}

AddUser.protoTypes = {
    members: PropTypes.array.isRequired,
    addUserToTeam: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    addUserToTeam: (teamId, userEmail) => dispatch(addUserToTeam(teamId, userEmail)),
});

export default connect(null, mapDispatchToProps)(AddUser);