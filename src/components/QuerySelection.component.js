import React, { Component } from "react";
import axios from "axios";
import DataDisplay from "./data-display.component";

export default class QuerySelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDataDisplay: false,
            queryNum: 1
        };
    }

    handleSubmit = async (params) => {
        await axios.get('http://localhost:3005/trend-queries/1', {
            params: {
                country: "United States",
                start_time: 0,
                end_time: 99999999999999
            }
        }).then((res) => {
            this.setState({
                toDataDisplay: true,
                chartData: res.data.result,
                querynum: 1
            });
            console.log(res.data.result)
        });
    }

    render() {
        if (this.state.toDataDisplay !== false) {
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <DataDisplay trendQuery={this.state.querynum} apiData={this.state.chartData}/>
                        <button type="button" className="btn btn-block btn-info btn-sm" onClick={
                            e => {this.setState({ toDataDisplay: false })}}>Go Back to Query Selection</button>
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
                        <button type="button" className="btn btn-outline-danger btn-block" onClick={
                            this.handleSubmit}>Press to Run Query</button>
                    </form>
                </div>
            </div>
        );
    }
};
