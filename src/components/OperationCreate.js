import React, { Component } from 'react';
import Calendar from 'react-calendar';
import api from '../api';

export class OperationCreate extends Component {
    constructor(props) {
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeMoneyValue = this.onChangeMoneyValue.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);

        const description = (this.props.updatingOperation)
            ? this.props.updatingOperation.description
            : "";

        const moneyValue = (this.props.updatingOperation)
            ? Math.abs(this.props.updatingOperation.money_value)
            : "";

        const category = (this.props.updatingOperation)
            ? this.props.updatingOperation.category
            : this.props.categories[0];

        const date = (this.props.updatingOperation)
            ? this.props.updatingOperation.date
            : new Date();

        this.state = {
            description: description,
            moneyValue: moneyValue,
            category: category,
            date: new Date(date)
        };
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }

    onChangeMoneyValue(e) {
        this.setState({ moneyValue: parseInt(e.target.value) });
    }

    onChangeDate(e) {
        this.setState({ date: e });
    }

    onChangeCategory(e) {
        api.get('categories/' + e.target.value)
            .then(category => this.setState({ category: category.data }))
            .catch(error => { console.log(error); });
    }

    onSubmit(e) {
        //The money value is entered positive in the user interface
        //but it is saved positive or negative depending if the category is income or expenses
        const moneyValue =
            (this.state.category.income)
                ? this.state.moneyValue
                : -this.state.moneyValue;

        //If the operation is being updated the '_id' field need to be passed
        const operationToSave = (this.props.updatingOperation)
            ? {
                _id: this.props.updatingOperation._id,
                description: this.state.description,
                date: this.state.date,
                category: this.state.category,
                money_value: moneyValue
            }
            : {
                description: this.state.description,
                date: this.state.date,
                category: this.state.category,
                money_value: moneyValue
            }

        this.props.onSaveOperation(operationToSave);
    }

    onClose() {
        this.props.onCreateFormClose();
    }

    render() {
        return (
            <div>
                <button className={"btn btn-outline-secondary fa fa-close"} style={{ float: "right" }} onClick={this.onClose} />
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="form-group col-2">
                            <label>Description: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                required
                            />
                        </div>

                        <div className="form-group col-2">
                            <label>Money Value: </label>
                            <input type="number" min="0"
                                className="form-control"
                                value={this.state.moneyValue}
                                onChange={this.onChangeMoneyValue}
                                required
                            />
                        </div>

                        <div className="form-group col-2">
                            <label>Category: </label>
                            <select className="form-control" onChange={this.onChangeCategory}>
                                {
                                    this.props.categories.map((category) =>
                                        (
                                            (this.state.category.description === category.description)
                                                ? this.optionSelected(category)
                                                : this.option(category)
                                        )
                                    )
                                }
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <Calendar onChange={this.onChangeDate} value={this.state.date} />
                    </div>

                    <div className="form-group"  >
                        <input type="submit" value="Save" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

    optionSelected(category) {
        if (category.income)
            return <option value={category._id} selected style={{ backgroundColor: "#D4EFDF" }}>{category.description}</option>;

        return <option value={category._id} style={{ backgroundColor: "#FADBD8" }}>{category.description}</option>;

    }

    option(category) {
        if (category.income)
            return <option value={category._id} style={{ backgroundColor: "#D4EFDF" }}>{category.description}</option>;

        return <option value={category._id} style={{ backgroundColor: "#FADBD8" }}>{category.description}</option>;
    }
}