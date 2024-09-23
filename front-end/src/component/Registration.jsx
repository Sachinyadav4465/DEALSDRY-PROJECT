import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Registration = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [cnfPassword, setCnfPassword] = useState('');
    let navigate = useNavigate();

    let submitForm = () => {
        let payload = {
            name, email, cnfPassword
        };
        if (!name || !email || !cnfPassword) {
            alert("To register, fill all the fields..!");
        } else {
            if (password === cnfPassword) {
                axios.post('http://localhost:4001/register', payload)
                    .then((e) => {
                        alert(e.data);
                        navigate("/");
                    })
                    .catch((e) => {
                        alert("Problem in sending data to the Backend.!");
                    });
            } else {
                alert("Both passwords should match..");
            }
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-400 to-blue-900 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-3xl max-w-lg w-full p-8 mx-4">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Admin Registration</h1>
                <div className="space-y-6">
                    <input
                        className="w-full px-4 py-2 border-2 border-violet-400 rounded-lg bg-gray-100 placeholder-gray-700 focus:outline-none focus:border-blue-600 transition duration-300"
                        placeholder="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        required
                        className="w-full px-4 py-2 border-2 border-violet-400 rounded-lg bg-gray-100 placeholder-gray-700 focus:outline-none focus:border-blue-600 transition duration-300"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        required
                        className="w-full px-4 py-2 border-2 border-violet-400 rounded-lg bg-gray-100 placeholder-gray-700 focus:outline-none focus:border-blue-600 transition duration-300"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="w-full px-4 py-2 border-2 border-violet-400 rounded-lg bg-gray-100 placeholder-gray-700 focus:outline-none focus:border-blue-600 transition duration-300"
                        placeholder="Confirm Password"
                        type="password"
                        value={cnfPassword}
                        onChange={(e) => setCnfPassword(e.target.value)}
                    />
                    <button
                        className="w-full bg-blue-600 text-white rounded-lg py-2 text-lg font-semibold hover:bg-blue-700 transition duration-300"
                        onClick={submitForm}
                    >
                        Register
                    </button>
                </div>
                <p className="text-center text-gray-700 mt-4">
                    Already have an account?{' '}
                    <Button variant="outlined">
                        <Link to="/" className="text-blue-600 hover:text-blue-800 transition duration-300">Sign In</Link>
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default Registration;
