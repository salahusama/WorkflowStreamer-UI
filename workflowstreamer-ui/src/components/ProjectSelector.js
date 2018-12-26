import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { getProjects } from '../actions/app';

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
            selectedItem: props.allowAll ? allProjectsObj : null,
        };
    }

    componentWillMount() {
        this.props.getProjects();
    }

    componentWillReceiveProps(newProps) {
        const { allowAll, projects } = newProps;
        
        if (!allowAll && projects && projects.length > 0) {
            this.setState({ selectedItem: projects[0] });
        }
    }

    componentDidUpdate() {
        const { selectedItem } = this.state;
        const { allowAll } = this.props;
        
        if (!allowAll) {
            this.props.onSelect(selectedItem);
        }
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
        this.props.onSelect(project === allProjectsObj ? null : project);
    }

    itemPredicate(input, project) {
        const projectName = project.name.toLowerCase();
        const inputValue = input.toLowerCase();
        return projectName.includes(inputValue);
    }

    render() {
        const { allowAll, projects, minimal } = this.props;
        const { selectedItem } = this.state;
        let projectsToShow = projects;

        if (!projects || projects.length === 0) {
            return null;
        }

        if (allowAll) {
            projectsToShow = [allProjectsObj, ...projects];
        }

        return (
            <Select
                items={projectsToShow}
                itemPredicate={this.itemPredicate}
                itemRenderer={this.renderItem}
                onItemSelect={this.handleClick}
                filterable={true}
                noResults={<MenuItem disabled={true} text="No results." />}
            >
                <Button minimal={minimal} rightIcon="caret-down" text={selectedItem && selectedItem.name} />
            </Select>
        );
    }
}

ProjectSelector.defaultProps = {
    allowAll: false,
    minimal: true,
};

ProjectSelector.propTypes = {
    getProjects: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    allowAll: PropTypes.bool,
    minimal: PropTypes.bool,
}

function mapStateToProps(state) {
    return {
        projects: state.projects.projects,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProjects: () => dispatch(getProjects()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectSelector);