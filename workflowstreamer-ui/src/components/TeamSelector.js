import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

class TeamSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.state = {
            selectedTeam: {},
        };
    }

    componentDidMount() {
        const { teams } = this.props;
        
        if (teams && teams.length > 0) {
            this.setState({ selectedTeam: teams[0] });
            this.props.onSelect(teams[0]);
        }
    }

    renderItem(team, { handleClick }) {
        const { selectedTeam } = this.state;
        const { teamId, name } = team;

        return (
            <MenuItem
                key={teamId}
                text={name}
                onClick={handleClick}
                active={name === selectedTeam.name}
            />
        );
    }

    handleClick(team) {
        const { teams } = this.props;
        this.setState({ selectedTeam: team });
        this.props.onSelect(team, teams.indexOf(team) + 1);
    }

    render() {
        const { className, teams } = this.props;
        const { selectedTeam } = this.state;

        if (!teams || teams.length === 0) {
            return null;
        }

        return (
            <Select
                items={teams}
                itemRenderer={this.renderItem}
                onItemSelect={this.handleClick}
                filterable={false}
                noResults={<MenuItem disabled={true} text="No results." />}
            >
                <Button minimal={false} rightIcon="caret-down" className={className} text={selectedTeam.name || 'Select Team'} />
            </Select>
        );
    }
}

TeamSelector.propTypes = {
    className: PropTypes.string,
    teams: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    teams: state.auth.user.teams,
})

export default connect(mapStateToProps)(TeamSelector);
