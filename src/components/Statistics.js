import React, { Component } from 'react';

export class Statistics extends Component {
    
    render() {
        return (
            <div className="row">
                <div style={{margin:20}}><strong>Income: {this.props.income}</strong></div>
                <div style={{margin:20}}><strong>Expenses: {this.props.expenses}</strong></div>
                <div style={{margin:20}}><strong>Balance: {this.props.income - this.props.expenses}</strong></div>
            </div>
        )
    }
}