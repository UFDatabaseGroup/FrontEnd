import React, { Component } from "react";
import axios from "axios";

export default class DbInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbRows: 1
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3005/').then((res) => {
            console.log(res)
            this.setState({dbRows: res.data.totalRowCount[0].TOTAL_COUNT});
        });
    }


    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h1>Database Information</h1>
                    <p>Total tuples in the Database: {this.state.dbRows} rows</p>
                </div>
            </div>
        );
    }
};
