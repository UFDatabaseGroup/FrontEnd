import React, { Component } from "react";
import axios from "axios";
import DataDisplay from "./data-display.component";

export default class QuerySelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toDataDisplay: false,
            queryNum: 0,
            chartData: null,
            country: null,
            start_timestamp: "1970-01-01",
            end_timestamp: "2034-01-01"
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async (params) => {
        let start_time = this.state.start_timestamp || '1970-01-01';
        let end_time = this.state.end_timestamp || '2034-01-01';
        await axios.get(`http://localhost:3005/trend-queries/${this.state.queryNum}`, {
            params: {
                country: this.state.country,
                start_time: (new Date(start_time)).getTime() / 1000,
                end_time: (new Date(end_time)).getTime() / 1000
            }
        }).then((res) => {
            console.log(res.data)
            this.setState({
                toDataDisplay: true,
                chartData: res.data.data,
            });

        });
        //alert(`Submitted\n Country - ${this.state.country} \n Start Date - ${this.state.start_timestamp} \n End Date - ${this.state.end_timestamp}`)
        params.preventDefault();
    }

    render() {
        const queryStyle = {
            textAlign: "left"
        }

        if (this.state.toDataDisplay !== false) {
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <DataDisplay country1={this.state.country} start={this.state.start_timestamp} end={this.state.end_timestamp} trendQuery={this.state.queryNum} apiData={this.state.chartData}/>
                        <button type="button" className="btn btn-block btn-info btn-sm" onClick={
                            e => {this.setState({ toDataDisplay: false })}}>Go Back to Query Selection</button>
                    </div>
                </div>
            )
        }

        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h1>Query Selection</h1>
                    <form>

                        <div style={queryStyle}>
                            <h4>Select query from the following selection</h4>
                            <input type="radio" name="queryNum" value="1" checked={this.state.queryNum === "1"} onChange={this.handleChange}/>
                            <label htmlFor="query-1">What are the total cases, total recovered, and total deaths in a country?</label><br/>

                            <input type="radio" name="queryNum" value="2" checked={this.state.queryNum === "2"} onChange={this.handleChange}/>
                            <label htmlFor="query-2">How much did each of the top 10 states, based on case count for a certain time period, contribute to the country's overall case count?</label><br/>

                            <input type="radio" name="queryNum" value="3" checked={this.state.queryNum === "3"} onChange={this.handleChange}/>
                            <label>Compare new cases and deaths per day for a region over a period of time.</label><br/>

                            <input type="radio" name="queryNum" value="4" checked={this.state.queryNum === "4"} onChange={this.handleChange}/>
                            <label htmlFor="query-4">How does the confirmed cases count affect unemployment rate by month per country?</label><br/>

                            <input type="radio" name="queryNum" value="5" checked={this.state.queryNum === "5"} onChange={this.handleChange}/>
                            <label htmlFor="query-5">What percentage and number of deaths did a country contribute to worldwide death count during the pandemic?</label><br/>

                            <input type="radio" name="queryNum" value="6" checked={this.state.queryNum === "6"} onChange={this.handleChange}/>
                            <label htmlFor="query-6">How many new cases does a country gain per day?</label><br/>

                            <label>Country</label><br/>
                            <input type="text" name="country" onChange={this.handleChange}/><br/>

                            <label>Start Date</label><br/>
                            <input type="text" name="start_timestamp" onChange={this.handleChange} value={this.state.start_timestamp}/><br/>
                            <label>End Date</label><br/>
                            <input type="text" name="end_timestamp" onChange={this.handleChange} value={this.state.end_timestamp}/><br/>
                            <br/>
                        </div>

                        <button type="button" onClick={this.handleSubmit} className="btn btn-outline-danger btn-block">Press to Run Query</button>
                    </form>
                </div>
            </div>
        );
    }
};
