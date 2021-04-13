import React, { Component } from "react";
import axios from "axios";
import DataDisplay from "./data-display.component";

export default class QuerySelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDataDisplay: false
        };
    }

    handleSubmit = async (params) => {
        console.log("Hello Button Submit")
        const response = await axios.post('http://localhost:3005/trend-queries/1');
        this.setState({ toDataDisplay: (await response).data });

    }

    render() {
        if (this.state.toDataDisplay !== false) {
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <DataDisplay/>
                    </div>
                </div>
            )
        }

        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h1>QuerySelection</h1>
                    <form >
                        <p>select timestamp, sum(confirmed) as total_confirmed
                            from covid_data
                            where country = 'United States' and state = 'Florida'
                            group by timestamp</p>
                        <button type="button" className="btn btn-outline-danger btn-block" onClick={this.handleSubmit}>Press to Run Query</button>
                    </form>
                </div>
            </div>
        );
    }
};
