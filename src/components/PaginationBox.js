import React, { Component } from 'react';


export class PaginationBox extends Component {

    constructor(props) {
        super(props);

        this.onNextPageClick = this.onNextPageClick.bind(this);
        this.onPreviousPageClick = this.onPreviousPageClick.bind(this);

    }

    onNextPageClick = (e) => {
        this.props.onNextPageClick(e);
    }

    onPreviousPageClick = (e) => {
        this.props.onPreviousPageClick(e);
    }

    render() {
        return (
            <div className={"row"} style={{ float: "right" }}>
                <button className="btn btn-outline-secondary fa fa-chevron-left" onClick={this.onPreviousPageClick} />
                <strong>{this.props.month}/{this.props.year}</strong>
                <button className="btn btn-outline-secondary fa fa-chevron-right" onClick={this.onNextPageClick} />
            </div>
        );
    }
}