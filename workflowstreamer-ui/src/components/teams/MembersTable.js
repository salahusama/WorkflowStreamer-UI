import React from 'react';
import PropTypes from 'prop-types';
import AddUser from './AddUser';

function MembersTable({ members, team }) {
    return (
        <div style={{ width: 'fit-content' }}>
            <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-striped bp3-interactive">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Role Description</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.roleDescription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddUser team={team} />
        </div>
    );
}

MembersTable.protoTypes = {
    members: PropTypes.array.isRequired,
    team: PropTypes.object.isRequired,
};

export default MembersTable;