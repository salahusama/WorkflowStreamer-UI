import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Card } from '@blueprintjs/core';
import { getChartData } from '../../utils/analytics';
import { defaultChartOptions } from '../../constants/analytics';

class Charts extends PureComponent {
    render() {
        const { events, options } = this.props;

        return options.map(option => {
            return (
                <Fragment>
                    <Card interactive={true} className="chart-card">
                        <Bar data={getChartData(events, option.details)} options={defaultChartOptions} />
                    </Card>
                </Fragment>
            );
        });
    }
}

Charts.defaultProps = {
    events: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    options: state.analytics.options.options,
});

export default connect(mapStateToProps)(Charts);
