import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

async function loginUser(credentials) {
    return await axios.post('http://localhost:3005/auth/login', null, { params: {
        username: credentials.username,
        password: credentials.password
    }}).then((res) => {
        console.log(res.data)
        if (res.data.token === "true") {
            alert("Username/password is valid!");
        } else {
            alert("Username/password is invalid!");
            return false;
        }
        return true;
    });
}


export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        if (token) setToken(token);
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input name="username" type="text" className="form-control" onChange={e => setUserName(e.target.value)} placeholder="Enter Username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>

                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
