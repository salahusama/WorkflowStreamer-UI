import React, { PureComponent } from 'react';
import { Card, MenuItem, Button, ButtonGroup, Popover, Position, Intent } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { DateRangePicker } from '@blueprintjs/datetime';
import { Events } from '../../constants/analytics';
import { getMonthYearFromDate } from '../../utils/DateUtil';

class ChartOptions extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.renderOption = this.renderOption.bind(this);
        this.toggleDatePicker = this.toggleDatePicker.bind(this);
        this.state = {
            isDatePickerOpen: false,
            form: {
                eventName: null,
                eventType: null,
                startDate: null,
                endDate: null,
            },
        };
    }

    componentDidMount() {
        const { form } = this.state;
        const { defaultOptions } = this.props;
        this.setState({
            form: {
                ...form,
                ...defaultOptions,
                startDate: defaultOptions.startDate ? new Date(defaultOptions.startDate) : null,
                endDate: defaultOptions.endDate ? new Date(defaultOptions.endDate) : null, 
            }
        });
    }

    toggleDatePicker() {
        const { isDatePickerOpen } = this.state;
        this.setState({ isDatePickerOpen: !isDatePickerOpen })
    }

    handleSelect(field, value) {
        const { form } = this.state;

        if (field === 'eventName') {
            this.setState({
                form: {
                    ...form,
                    [field]: value,
                    eventType: null,
                }
            });
            return;
        }

        this.setState({
            form: {
                ...form,
                [field]: value,
            },
        });
    }

    handleDateChange(value) {
        const { form } = this.state;
        
        if (value[0] && value[1]) {
            this.toggleDatePicker();
        }

        this.setState({
            form: {
                ...form,
                startDate: value[0],
                endDate: value[1],
            }
        });
    }

    save() {
        const { form } = this.state;
        const { id, onSelect } = this.props;
        onSelect(id, form);
    }

    delete() {
        const { id, onDelete } = this.props;
        onDelete(id);
    }

    renderOption(field, value, { handleClick }) {
        return (
            <MenuItem
                key={value}
                text={value}
                active={value === this.state[field]}
                onClick={handleClick}
            />
        );
    }

    optionPredicate(input, item) {
        return item.toLowerCase().includes(input.toLowerCase());
    }

    renderDropDownButton(field, text, items, disabled) {
        const selectedValue = this.state.form[field];

        return (
            <Select
                items={items}
                itemPredicate={this.optionPredicate}
                itemRenderer={(value, handler) => this.renderOption(field, value, handler)}
                onItemSelect={(value) => this.handleSelect(field, value)}
            >
                <Button disabled={disabled} alignText="left" text={selectedValue || text} rightIcon="caret-down" />
            </Select>
        );
    }

    renderDateRangePicker() {
        const { isDatePickerOpen, form: { endDate, startDate } } = this.state;
        return (
            <Popover isOpen={isDatePickerOpen} position={Position.BOTTOM_RIGHT}>
                <Button alignText="left" text={endDate || startDate ? `${getMonthYearFromDate(startDate)} -> ${getMonthYearFromDate(endDate)}` : 'Date Range'} rightIcon="calendar" onClick={this.toggleDatePicker} />
                <DateRangePicker
                    value={[startDate, endDate]}
                    onChange={this.handleDateChange}
                />
            </Popover>
        );
    }

    render() {
        const { eventName } = this.state.form;

        return (
            <Card style={{ marginBottom: '10px' }}>
                <ButtonGroup vertical={true} style={{ width: '-webkit-fill-available' }}>
                    {this.renderDropDownButton('eventName', 'Event Name', Events.map(event => event.name))}
                    {this.renderDropDownButton('eventType', 'Event Type', eventName ? Events.find(({ name }) => name === eventName).Types : [], !eventName)}
                    {this.renderDateRangePicker()}
                </ButtonGroup>

                <ButtonGroup fill={true} style={{ marginTop: '5px' }}>
                    <Button intent={Intent.SUCCESS} icon="tick-circle" onClick={this.save} style={{ width: '80%' }} />
                    <Button intent={Intent.DANGER} icon="delete" onClick={this.delete} />
                </ButtonGroup>
            </Card>
        );
    }
}

export default ChartOptions;
