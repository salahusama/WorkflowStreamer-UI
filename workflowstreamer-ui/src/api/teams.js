import { getWorkflowStreamerBase } from '../utils/env';

export function getUserTeams(userId) {
    const url = `${getWorkflowStreamerBase()}/teams?userId=${userId}`;
    return fetch(url);
}

export function addTeam(newTeam) {
    const url = `${getWorkflowStreamerBase()}/teams/team`;
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeam),
    });
}

export function getTeamMembers(teamId) {
    const url = `${getWorkflowStreamerBase()}/teams/team/${teamId}/members`;
    return fetch(url);
}

export function addUserToTeam(teamId, userEmail) {
    const url = `${getWorkflowStreamerBase()}/teams/team/${teamId}/members`;
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: userEmail,
    });
}
