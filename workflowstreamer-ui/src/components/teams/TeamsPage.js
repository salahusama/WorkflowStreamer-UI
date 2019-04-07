import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Alignment } from '@blueprintjs/core';

import UserMenu from '../UserMenu';
import MenuOpener from '../MenuOpener';
import TeamsColumn from './TeamsColumn';
import TeamView from './TeamView';

class TeamsPage extends PureComponent {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            selectedTeam: null,
        };
    }

    onChange(selectedTeam) {
        this.setState({ selectedTeam });
    }

    render() {
        const { teams } = this.props;
        const { selectedTeam } = this.state;

        return (
            <Fragment>
                <Navbar fixedToTop={true}>
                    <Navbar.Group align={Alignment.LEFT}>
                        <MenuOpener />
                    </Navbar.Group>
                    <Navbar.Group align={Alignment.RIGHT}>
                        <UserMenu />
                    </Navbar.Group>
                </Navbar>

                <TeamsColumn teams={teams} onSelect={this.onChange} />
                <TeamView team={selectedTeam || teams[0]}/>
            </Fragment>
        );
    }
}

TeamsPage.defaultProps = {
    teams: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    teams: state.auth.user.teams,
});

export default connect(mapStateToProps, null)(TeamsPage);
