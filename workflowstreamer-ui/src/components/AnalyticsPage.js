import React, { PureComponent, Fragment } from 'react';
import { Navbar, Alignment } from '@blueprintjs/core';
import UserMenu from './UserMenu';
import MenuOpener from './MenuOpener';

import { Line, Bar } from 'react-chartjs-2';

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

const style = {
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto'
};

class Page extends PureComponent {
    render() {
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

                <div style={style}>
                    <Bar
                        data={barData}
                        options={options}
                    />
                </div>

                <div style={{ ...style, marginTop: '30px' }}>
                    <Line
                        data={lineData}
                        options={options}
                    />
                </div>

                <div style={{ ...style, marginTop: '30px', marginBottom: '30px' }}>
                    <Line
                        data={combinedLineData}
                        options={options}
                    />
                </div>
            </Fragment>
        );
    }
}

export default Page;
