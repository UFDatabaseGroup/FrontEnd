import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
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
        alert(`Your favorite flavor is: ${this.state.username} and ${this.state.password} `);

        const user = {
            username: this.state.username,
            passwd: this.state.password
        }

        await axios.post(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/auth/login`, { user })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.props.setToken(res.data);
            });
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" type="text" className="form-control" onChange={this.handleChange} placeholder="Enter Username" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" className="form-control" onChange={this.handleChange} placeholder="Enter password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>

                    </form>
                </div>
            </div>
        );
    }
}
