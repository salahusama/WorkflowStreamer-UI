import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputGroup, FormGroup, Intent, Button, TextArea, Card } from "@blueprintjs/core";
import { addProject } from '../actions/app';
import AppToaster from '../utils/AppToaster';
import TeamSelector from './TeamSelector';

class NewProjectForm extends PureComponent {
    constructor(props) {
        super(props);
        this.addProject = this.addProject.bind(this);
        this.handleTeamSelect = this.handleTeamSelect.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.state = {
            form: {
                name: null,
                description: null,
                teamId: null,
            }
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

    handleTeamSelect(team) {
        const { form } = this.state;
        this.setState({
            form: {
                ...form,
                teamId: team.teamId,
            }
        });
    }

    addProject(e) {
        const { name } = this.state.form;
        e.preventDefault();

        if (!name) {
            AppToaster.show({
                message: 'Please select a name for the new project.',
                intent: Intent.DANGER,
            });
            return;
        }

        this.props.addProject(this.state.form);
        this.props.onSubmit();
    }

    render() {
        return (
            <Card>
                <form onSubmit={this.addProject}>
                    <FormGroup label="Add a New Project">
                        <InputGroup name="name" onChange={this.handleFormChange} large={true} type="text" placeholder="Project Name" style={{ marginBottom: '10px' }} />
                        <TextArea name="description" onChange={this.handleFormChange} large={true} fill={true} type="text" placeholder="Description" style={{ marginBottom: '10px' }} />
                        <TeamSelector onSelect={this.handleTeamSelect} />
                        <br />
                        <Button
                            type="submit"
                            intent={Intent.SUCCESS}
                            style={{ marginTop: '10px' }}
                        >
                            Add Project
                        </Button>
                    </FormGroup>
                </form>
            </Card>
        );
    }
}

NewProjectForm.propTypes = {
    addProject: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        addProject: (project) => dispatch(addProject(project)),
    }
};

export default connect(null, mapDispatchToProps)(NewProjectForm);
