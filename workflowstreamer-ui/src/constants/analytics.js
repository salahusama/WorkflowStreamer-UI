export const Events = [{
    name: 'task-interaction',
    Types: ['created', 'updated'],
}, {
    name: 'project-interaction',
    Types: ['created'],
}];

export const defaultChartOptions = {
    maintainAspectRatio: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
};
