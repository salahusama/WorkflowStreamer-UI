import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { getEventCountOverTime } from '../../utils/analytics';
import { Card } from '@blueprintjs/core';

const style = {
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '30px',
};

const options = {
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
        const { events } = this.props;
        return (
            <Fragment>
                <Card interactive={true} style={style}>
                    <div>
                        <Bar data={getEventCountOverTime('task-interaction', 'created', events)} options={options} />
                    </div>
                </Card>

                <Card interactive={true} style={style}>
                    <div>
                        <Line data={getEventCountOverTime('task-interaction', 'created', events)} options={options} />
                    </div>
                </Card>

                <Card interactive={true} style={style}>
                    <div>
                        <Pie data={getEventCountOverTime('task-interaction', 'created', events)} options={options} />
                    </div>
                </Card>

                <Card interactive={true} style={style}>
                    <div>
                        <Doughnut data={getEventCountOverTime('task-interaction', 'created', events)} options={options} />
                    </div>
                </Card>
            </Fragment>
        );
    }
}

Charts.defaultProps = {
    events: PropTypes.array.isRequired,
};

export default Charts;



/*
const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
        label: 'Tasks Created',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }],
};

const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
        fill: true,
        lineTension: .2,
        label: 'Tasks Completed',
        data: [8, 10, 1, 5, 7, 0],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }],
};

const combinedLineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
        fill: false,
        lineTension: .2,
        label: 'Tasks Created',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
    }, {
        fill: false,
        lineTension: .2,
        label: 'Tasks Created',
        data: [8, 10, 1, 5, 7, 0],
        backgroundColor: ['rgba(66, 166, 233, 0.2)'],
        borderColor: ['rgba(66, 166, 233, 1)'],
        borderWidth: 1
    }],
};
*/