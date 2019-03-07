import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Alignment, Spinner, Intent } from '@blueprintjs/core';
import UserMenu from '../UserMenu';
import MenuOpener from '../MenuOpener';
import Charts from './Charts';
import { getEvents } from '../../actions/analytics';
import Status from '../../constants/status';
import OptionsColumn from './OptionsColumn';

class AnalyticsPage extends PureComponent {
    componentDidMount() {
        this.props.getEvents();
    }

    render() {
        const { status, events, options } = this.props;
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

                <OptionsColumn />

                <div className="analytics-charts" > 
                    {status === Status.SUCCESS
                        ? <Charts events={events} options={options} />
                        : <Spinner size={100} intent={Intent.SUCCESS} className="page-spinner" />
                    }
                </div>
            </Fragment>
        );
    }
}

AnalyticsPage.defaultProps = {
    events: PropTypes.array,
    options: PropTypes.array,
    status: PropTypes.string,
    getEvents: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    events: state.analytics.events.events,
    status: state.analytics.events.status,
    options: state.analytics.options.options,
});

const mapDispatchToProps = dispatch => ({
    getEvents: () => dispatch(getEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage);
