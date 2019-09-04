import React, { Component } from 'react';
import { OperationRow } from './OperationRow';
import api from '../api';

export class OperationList extends Component {
    constructor(props) {
        super(props);
        this.state = { operations: [] };
    }
    componentDidUpdate() {
        api.get('operations/' + this.props.year + '/' + this.props.month)
            .then(op => { this.setState({ operations: op.data }) });
    }
    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Money value</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.operations.map(element => {
                                return <OperationRow element={element}
                                    onDeleteButtonClick={this.props.onDeleteButtonClick}
                                    onUpdateButtonClick={this.props.onUpdateButtonClick} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}