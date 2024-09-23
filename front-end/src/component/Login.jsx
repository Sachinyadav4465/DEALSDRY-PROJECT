import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

const Login = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let navigate = useNavigate();

    let login = () => {
        let payload = { email, password };
        axios.post('http://localhost:4001/login', payload)
            .then((e) => {
                if (e.data.status === "success") {
                    navigate(`/dashbord/${e.data.id}`);
                } else if (e.data.status === "fail") {
                    alert("Wrong password");
                } else if (e.data.status === "noUser") {
                    alert("Invalid Email");
                }
            });
    };

    return (
        <div className="bg-gradient-to-r from-blue-400 to-blue-900 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-3xl max-w-lg w-full p-8 mx-4">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login Form</h1>
                <div className="space-y-6">
                    <input
                        className="w-full px-4 py-2 border-2 border-violet-400 rounded-lg bg-gray-100 placeholder-gray-700 focus:outline-none focus:border-blue-600 transition duration-300"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="w-full px-4 py-2 border-2 border-violet-400 rounded-lg bg-gray-100 placeholder-gray-700 focus:outline-none focus:border-blue-600 transition duration-300"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className="w-full bg-blue-600 text-white rounded-lg py-2 text-lg font-semibold hover:bg-blue-700 transition duration-300"
                        onClick={login}
                    >
                        LOGIN
                    </button>
                </div>
                <p className="text-center text-gray-700 mt-4">
                    Don't have an account?{' '}
                    <Button variant="outlined">
                        <Link to="/register" className="text-blue-600 hover:text-blue-800 transition duration-300">Sign Up</Link>
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default Login;
