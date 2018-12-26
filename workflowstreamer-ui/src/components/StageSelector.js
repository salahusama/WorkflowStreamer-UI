import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

class StageSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.state = {
            selectedStage: null,
        };
    }

    renderItem(stage, { handleClick }) {
        const { selectedStage } = this.state;

        return (
            <MenuItem
                key={stage}
                text={stage}
                onClick={handleClick}
                active={stage === selectedStage}
            />
        );
    }

    handleClick(stage) {
        this.setState({ selectedStage: stage });
        this.props.onSelect(stage);
    }

    itemPredicate(input, stage) {
        const stageName = stage.toLowerCase();
        const inputValue = input.toLowerCase();
        return stageName.includes(inputValue);
    }

    render() {
        const { className, userStages } = this.props;
        const { selectedStage } = this.state;

        if (!userStages || userStages.length === 0) {
            return null;
        }

        return (
            <Select
                items={userStages}
                itemPredicate={this.itemPredicate}
                itemRenderer={this.renderItem}
                onItemSelect={this.handleClick}
                filterable={true}
                noResults={<MenuItem disabled={true} text="No results." />}
            >
                <Button minimal={false} rightIcon="caret-down" className={className} text={selectedStage || 'Select Stage'} />
            </Select>
        );
    }
}

StageSelector.propTypes = {
    className: PropTypes.string,
    userStages: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        userStages: state.userStages,
    };
}

export default connect(mapStateToProps)(StageSelector);
