import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';
import ScreenOpener from '../ScreenOpener';
import NewTeamForm from './NewTeamForm';

function TeamsColumn({ teams, onSelect }) {
    return (
        <div className="teams-column">
            {teams.map((team, index) => (
                <Card
                    key={index}
                    interactive={true}
                    style={{ marginBottom: '10px' }}
                    onClick={() => onSelect(team)}
                >
                    {team.name}
                </Card>
            ))}
            <ScreenOpener icon="insert" toggleOnSubmit={true}>
                <NewTeamForm />
            </ScreenOpener>
        </div>
    );
}

TeamsColumn.propTypes = {
    teams: PropTypes.array.isRequired,
};

export default TeamsColumn;
