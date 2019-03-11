import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChartOptions from './ChartOptions';
import { Button, Spinner } from '@blueprintjs/core';
import { getChartOptions, submitChartOptions } from '../../actions/analytics';
import Status from '../../constants/status';

class OptionsColumn extends PureComponent {
    constructor(props) {
        super(props);
        this.handleOptionsSelect = this.handleOptionsSelect.bind(this);
        this.addChart = this.addChart.bind(this);
        this.deleteChart = this.deleteChart.bind(this);
        this.state = {
            chartOptions: [],
        }
    }

    componentDidMount() {
        this.props.getChartOptions();
    }

    componentWillReceiveProps(nextProps) {
        const { options } = nextProps;
        this.setState({ chartOptions: options });
    }

    handleOptionsSelect(id, details) {
        const { chartOptions } = this.state;
        this.setState({
            chartOptions: chartOptions.map(option => option.id === id ? { id, details } : option),
        }, () => this.props.submitChartOptions(this.state.chartOptions));
    }

    addChart() {
        const { chartOptions } = this.state;
        const ids = chartOptions.map(option => option.id);
        const nextId = ids.length ? Math.max(...ids) + 1 : 1;
        this.setState({
            chartOptions: [...chartOptions, { id: nextId, details: {} }],
        });
    }

    deleteChart(id) {
        const { chartOptions } = this.state;
        this.setState({
            chartOptions: chartOptions.filter(option => option.id !== id),
        }, () => this.props.submitChartOptions(this.state.chartOptions));
    }

    render() {
        const { chartOptions } = this.state;
        const { status } = this.props;

        return (
            <div className="analytics-options">
                {!status || status === Status.PENDING
                ? <Spinner size={50} className="options-spinner" />
                : <Fragment>
                    {chartOptions.map(({ id, details }) => (
                        <ChartOptions
                            key={id}
                            id={id}
                            onSelect={this.handleOptionsSelect}
                            onDelete={this.deleteChart}
                            defaultOptions={details}
                        />
                    ))}
                    <Button minimal={true} icon="add" fill={true} onClick={this.addChart} />
                </Fragment>
                }
            </div>
        );
    }
}

OptionsColumn.propTypes = {
    status: PropTypes.string,
    options: PropTypes.array.isRequired,
    getChartOptions: PropTypes.func.isRequired,
    submitChartOptions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    options: state.analytics.options.options,
    status: state.analytics.options.status,
});

const mapDispatchToProps = dispatch => ({
    getChartOptions: () => dispatch(getChartOptions()),
    submitChartOptions: (chartOptions) => dispatch(submitChartOptions(chartOptions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsColumn);
