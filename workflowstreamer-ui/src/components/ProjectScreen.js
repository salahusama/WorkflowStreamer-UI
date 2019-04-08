import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Collapse, Button } from '@blueprintjs/core';
import ProjectSelector from './ProjectSelector';
import NewProjectForm from './NewProjectForm';

class ProjectScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.state = {
            selectedProject: null,
            isOpen: false,
        };
    }

    toggleForm() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    handleProjectChange(project) {
        this.setState({ selectedProject: project });
    }

    render() {
        const { selectedProject, isOpen } = this.state;
        const btnStyle = isOpen ? { marginBottom: '10px' } : {};
        const btnIcon = isOpen ? 'chevron-up' : 'chevron-down';

        return (
            <Card>
                <ProjectSelector onSelect={this.handleProjectChange} minimal={false} filterable={false} />
                {selectedProject && (
                    <div>
                        <h3>{selectedProject.name}</h3>
                        <p>{selectedProject.description}</p>
                    </div>
                )}
                <Button rightIcon={btnIcon} onClick={this.toggleForm} style={btnStyle}>Add New Project</Button>
                <Collapse isOpen={isOpen}>
                    <NewProjectForm onSubmit={this.toggleForm} />
                </Collapse>
            </Card>
        );
    }
}

ProjectScreen.propTypes = {};

function mapStateToProps(state) {
    return {
        projects: state.projects.projects,
    };
}

export default connect(mapStateToProps)(ProjectScreen);
