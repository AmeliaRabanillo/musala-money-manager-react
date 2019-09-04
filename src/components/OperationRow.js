import React, { Component } from 'react';

export class OperationRow extends Component {

    onUpdateButtonClick = (e) => {
        this.props.onUpdateButtonClick(this.props.element);
    }

    onDeleteButtonClick = (e) => {
        this.props.onDeleteButtonClick(this.props.element._id);
    }
    render() {
        return (
            <tr>
                <td>{this.props.element.category.description}</td>
                <td>{this.props.element.description}</td>
                <td>{this.props.element.money_value}</td>
                <td>{this.props.element.date.slice(0, 10)}</td>
                <td>
                    <button style={{ marginRight: 10 }} className="btn btn-outline-secondary fa fa-edit" onClick={this.onUpdateButtonClick} />
                    <button className="btn btn-outline-secondary fa fa-trash" onClick={this.onDeleteButtonClick} />
                </td>
            </tr>
        );
    }
}