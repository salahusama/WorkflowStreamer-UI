export function getTeamById(teamId) {
    return (dispatch, getState) => {
        const teams = getState().teams.teams;
        return teams.find(team => team.teamId === teamId)
    }
}