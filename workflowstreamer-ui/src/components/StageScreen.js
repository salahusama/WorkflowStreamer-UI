import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Slider } from '@blueprintjs/core';
import StageSelector from './StageSelector';

class ProjectScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleStageChange = this.handleStageChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.state = {
            selectedStage: null,
            order: null,
        };
    }

    toggleForm() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    handleStageChange(stage, order) {
        this.setState({
            selectedStage: stage,
            order,
        });
    }

    handleOrderChange(newOrder) {
        this.setState({ order: newOrder });
    }

    render() {
        const { selectedStage, order } = this.state;
        const { stages } = this.props;

        return (
            <Card>
                <div>
                    <div>
                        <StageSelector onSelect={this.handleStageChange} minimal={false} filterable={false} />
                        {selectedStage && <Slider
                            min={1}
                            max={stages.length}
                            stepSize={1}
                            value={order || stages.indexOf(selectedStage)}
                            showTrackFill={false}
                            onChange={this.handleOrderChange}
                            disabled={true}
                            className="m-top-30"
                        />}
                    </div>
                </div>
            </Card>
        );
    }
}

ProjectScreen.propTypes = {

};

function mapStateToProps(state) {
    return {
        stages: state.userStages,
    };
}

export default connect(mapStateToProps)(ProjectScreen);
