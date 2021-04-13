import React, { Component } from "react";
import axios from "axios";

export default class DbInfo extends Component {
    constructor(props) {
        super(props);
        console.log("Constructor")
        // const response = await axios.post('http://localhost:3005/db-info');
        // this.setState({ dbRows: (await response).data });
        this.state = {
            dbRows: 500
        };
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h1>Database Information</h1>
                    <p>Total tuples in the Database: {this.state.dbRows}</p>
                </div>
            </div>
        );
    }
};
