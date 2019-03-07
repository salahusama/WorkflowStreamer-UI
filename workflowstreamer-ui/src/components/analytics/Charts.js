import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Card } from '@blueprintjs/core';
import { getChartData } from '../../utils/analytics';

const style = {
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '30px',
};

const chartOptions = {
    maintainAspectRatio: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
};

class Charts extends PureComponent {
    render() {
        const { events, options } = this.props;

        return options.map(option => {
            return (
                <Fragment>
                    <Card interactive={true} style={style}>
                        <Bar data={getChartData(events, option.details)} options={chartOptions} />
                    </Card>

                    <Card interactive={true} style={style}>
                        <Line data={getChartData(events, option.details)} options={chartOptions} />
                    </Card>

                    <Card interactive={true} style={style}>
                        <Pie data={getChartData(events, option.details)} options={chartOptions} />
                    </Card>

                    <Card interactive={true} style={style}>
                        <Doughnut data={getChartData(events, option.details)} options={chartOptions} />
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
