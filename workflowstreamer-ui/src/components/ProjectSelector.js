import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, MenuItem, PopoverInteractionKind } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { getProjects } from '../actions/app';
import { getTeamById } from '../actions/teamActions';
import ScreenOpener from './ScreenOpener';
import ProjectScreen from './ProjectScreen';

const allProjectsObj = {
    projectId: 0,
    teamId: 0,
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
        const { projectId, name, teamId } = project;
        const { selectedItem } = this.state;

        const team = this.props.getTeamById(teamId);

        return (
            <MenuItem
                key={projectId}
                text={name}
                label={team ? team.name : `Team ${teamId}`}
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
        const { allowAll, projects, minimal, filterable } = this.props;
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
                filterable={filterable}
                noResults={<ScreenOpener btnText="Open Projects Menu" icon="projects"><ProjectScreen /></ScreenOpener>}
                popoverProps={{ interactionKind: PopoverInteractionKind.CLICK_TARGET_ONLY }}
            >
                <Button minimal={minimal} rightIcon="caret-down" text={selectedItem && selectedItem.name} />
            </Select>
        );
    }
}

ProjectSelector.defaultProps = {
    allowAll: false,
    minimal: true,
    filterable: true,
};

ProjectSelector.propTypes = {
    getProjects: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    allowAll: PropTypes.bool,
    minimal: PropTypes.bool,
    filterable: PropTypes.bool,
}

function mapStateToProps(state) {
    return {
        projects: state.projects.projects,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProjects: () => dispatch(getProjects()),
        getTeamById: (id) => dispatch(getTeamById(id)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectSelector);
