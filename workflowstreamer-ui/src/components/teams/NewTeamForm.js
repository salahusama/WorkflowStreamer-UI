import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, InputGroup, FormGroup, Intent, Button, TextArea } from "@blueprintjs/core";
import { addTeam } from '../../actions/app';
import AppToaster from '../../utils/AppToaster';

class NewTaskForm extends PureComponent {
    constructor(props) {
        super(props);
        this.addTeam = this.addTeam.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.state = {
            form: {
                name: null,
                description: null,
            }
        }
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

    addTeam(e) {
        const { name, description } = this.state.form;
        e.preventDefault();

        if (!name || !description) {
            AppToaster.show({
                message: 'Please fill all required fields.',
                intent: Intent.WARNING,
            });
            return;
        }

        this.props.addTeam(this.state.form);
        this.props.onSubmit();
    }

    render() {
        return (
            <Card>
                <form onSubmit={this.addTeam}>
                    <FormGroup label="Create a New Team">
                        <InputGroup
                            name="name"
                            onChange={this.handleFormChange}
                            large={true}
                            type="text"
                            placeholder="Team Name"
                            style={{ marginBottom: '10px' }}
                        />
                        <TextArea
                            name="description"
                            onChange={this.handleFormChange}
                            large={true}
                            fill={true}
                            type="text"
                            placeholder="Description"
                            style={{ marginBottom: '10px' }}
                        />
                        <br />
                        <Button type="submit" intent={Intent.SUCCESS}>Create Team</Button>
                    </FormGroup>
                </form>
            </Card>
        );
    }
}

NewTaskForm.propTypes = {
    addTeam: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
};

function mapStateToProps(dispatch) {
    return {
        addTeam: (team) => dispatch(addTeam(team)),
    }
};

export default connect(null, mapStateToProps)(NewTaskForm);