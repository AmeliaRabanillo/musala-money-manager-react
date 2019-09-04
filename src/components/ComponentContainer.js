import React, { Component } from 'react';
import { PaginationBox } from './PaginationBox';
import { OperationList } from './OperationsList';
import { OperationCreate } from './OperationCreate';
import { Statistics } from './Statistics';
import api from '../api';
import { stat } from 'fs';

export class ComponentContainer extends Component {
    constructor(props) {
        super(props);

        this.onNextPageClick = this.onNextPageClick.bind(this);
        this.onPreviousPageClick = this.onPreviousPageClick.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.onAddOperationButtonClick = this.onAddOperationButtonClick.bind(this);
        this.onSaveOperation = this.onSaveOperation.bind(this);
        this.onUpdateOperation = this.onUpdateOperation.bind(this);
        this.onCreateFormClose = this.onCreateFormClose.bind(this);
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);

        const date = new Date();
        this.state = {
            month: date.getMonth() + 1,//Because the component gives the month starting at 0
            year: date.getFullYear(),
            operations: [],
            creating: false,
            updating: false
        };
    }
    calculateStatistics(operations) {
        var income = 0;
        var expenses = 0;

        operations.forEach(element => {
            if (element.category.income)
                income += element.money_value;
            else
                expenses += element.money_value;
        });

        return { income: income, expenses: -expenses };
    }

    componentDidMount() {
        api.get('operations/' + this.state.year + '/' + this.state.month)
            .then(op => {
                var statistics = this.calculateStatistics(op.data);
                this.setState({
                    operations: op.data,
                    income: statistics.income,
                    expenses: statistics.expenses
                });
            });

        api.get('categories')
            .then(result => {
                this.setState({ categories: result.data });
            });
    }

    onNextPageClick = (e) => {
        var month = this.state.month;
        var year = this.state.year;
        if (this.state.month === 12) {
            month = 1;
            year = this.state.year + 1;
        }
        else
            month = this.state.month + 1;

        api.get('operations/' + year + '/' + month).then(op => {
            var statistics = this.calculateStatistics(op.data);
            this.setState({
                operations: op.data,
                income: statistics.income,
                expenses: statistics.expenses,
                month: month,
                year: year
            })
        });
    }

    onPreviousPageClick = (e) => {
        var year = this.state.year;
        var month = this.state.month;

        if (this.state.month === 1) {
            month = 12;
            year = this.state.year - 1;
        }
        else
            month = this.state.month - 1;

        api.get('operations/' + year + '/' + month).then(op => {
            var statistics = this.calculateStatistics(op.data);
            this.setState({ operations: op.data, income: statistics.income, expenses: statistics.expenses })
        })

        this.setState({ month: month, year: year });
    }

    onDeleteButtonClick = (id) => {
        api.delete('operations/' + id)            
            .catch(error => { console.log("Imposible to delete operation"); });
    }

    onUpdateButtonClick = (operation) => {
        this.setState({ updating: true, updatingOperation: operation });
    }

    onAddOperationButtonClick() {
        this.setState({ creating: true });
    }

    onSaveOperation(operation) {
        api.post('operations', operation)
            .catch(error => console.log("Imposible to save the operation"));
    }

    onUpdateOperation(operation) {
        api.put('operations/' + operation._id, operation)
            .catch(error => { console.log("Imposible to Update the operation") });
    }

    onCreateFormClose() {
        this.setState({ creating: false, updating: false });
    }

    render() {
        var content = <button className="btn btn-outline-secondary"
            onClick={this.onAddOperationButtonClick}>Add Operation</button>

        if (this.state.creating)
            content = <OperationCreate categories={this.state.categories}
                onSaveOperation={this.onSaveOperation}
                onCreateFormClose={this.onCreateFormClose} />

        if (this.state.updating)
            content = <OperationCreate categories={this.state.categories}
                onSaveOperation={this.onUpdateOperation}
                onCreateFormClose={this.onCreateFormClose}
                updatingOperation={this.state.updatingOperation} />

        return (
            <div style={{ marginTop: 50 }}>
                <div>
                    {content}
                </div>

                <Statistics income={this.state.income} expenses={this.state.expenses} />

                <PaginationBox month={this.state.month}
                    year={this.state.year}
                    onNextPageClick={this.onNextPageClick}
                    onPreviousPageClick={this.onPreviousPageClick} />

                <OperationList operations={this.state.operations}
                    onDeleteOperation={this.onDeleteOperation}
                    onDeleteButtonClick={this.onDeleteButtonClick}
                    onUpdateButtonClick={this.onUpdateButtonClick}
                    year={this.state.year}
                    month={this.state.month} />
            </div >
        )
    }
}