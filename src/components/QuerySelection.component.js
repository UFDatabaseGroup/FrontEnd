import React, { Component } from "react";
import axios from "axios";

export default class QuerySelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        await axios.post(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/auth/login`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h1>QuerySelection</h1>
                    <form onSubmit={this.handleSubmit}>
                        <p>select timestamp, sum(confirmed) as total_confirmed
                            from covid_data
                            where country = 'United States' and state = 'Florida'
                            group by timestamp</p>
                        <button type="submit" className="btn btn-outline-danger btn-block">Press to Run Query</button>
                    </form>
                </div>
            </div>
        );
    }
}
