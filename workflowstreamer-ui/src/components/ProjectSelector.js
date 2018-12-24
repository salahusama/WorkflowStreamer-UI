import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { getProjects, updateSelectedProject } from '../actions/app';

const allProjectsObj = {
    projectId: 0,
    name: 'All Projects',
    description: 'Show All projects',
};

class ProjectSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.state = {
            selectedItem: allProjectsObj,
        };
    }

    componentWillMount() {
        this.props.getProjects();
    }

    renderItem(project, { handleClick }) {
        const { projectId, name, description } = project;
        const { selectedItem } = this.state;

        return (
            <MenuItem
                key={projectId}
                text={name}
                label={description}
                onClick={handleClick}
                active={project === selectedItem}
            />
        );
    }

    handleClick(project) {
        this.setState({ selectedItem: project });
        this.props.updateSelectedProject(project === allProjectsObj ? null : project);
    }

    render() {
        const { projects } = this.props;
        const { selectedItem } = this.state;
        const textToShow = selectedItem ? selectedItem.name : 'All Projects';

        if (!projects) {
            return null;
        }

        const projectsToShow = [allProjectsObj, ...projects];

        return (
            <Select
                items={projectsToShow}
                itemRenderer={this.renderItem}
                onItemSelect={this.handleClick}
                filterable={false}
            >
                <Button minimal={true} rightIcon="caret-down" text={textToShow} />
            </Select>
        );
    }
}

ProjectSelector.propTypes = {
    getProjects: PropTypes.func.isRequired,
    updateSelectedProject: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        projects: state.projects.projects,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProjects: () => dispatch(getProjects()),
        updateSelectedProject: (project) => dispatch(updateSelectedProject(project)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectSelector);