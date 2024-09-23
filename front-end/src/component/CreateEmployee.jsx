import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const CreateEmployee = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState([]);
    const [image, setImage] = useState(null);

    const formHandle = (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !designation || !gender || course.length === 0 || !image) {
            alert("To Create Employee, fill all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('designation', designation);
        formData.append('gender', gender);
        course.forEach(c => formData.append('course', c));
        formData.append('image', image);

        axios.post("http://localhost:4001/employees", formData)
            .then((response) => {
                alert(response.data);
                navigate("/employee-list");
            })
            .catch((error) => {
                console.error("Cannot register.", error);
            });
    };

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCourse(prev => [...prev, value]);
        } else {
            setCourse(prev => prev.filter(item => item !== value));
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-900 min-h-screen flex items-center justify-center py-12">
            <div className="bg-white shadow-xl rounded-3xl max-w-lg w-full p-8 mx-4">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create Employee</h1>
                <form onSubmit={formHandle} className="space-y-6">
                    {/* Name Field */}
                    <input
                        className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg bg-gray-100 placeholder-gray-700 focus:outline-none focus:border-blue-600 transition duration-300"
                        placeholder="Enter Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Email Field */}
                    <input
                        className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg bg-gray-100 placeholder-gray-700 focus:outline-none focus:border-blue-600 transition duration-300"
                        placeholder="Enter Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Phone Field */}
                    <input
                        className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg bg-gray-100 placeholder-gray-700 focus:outline-none focus:border-blue-600 transition duration-300"
                        placeholder="Enter Phone Number"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />

                    {/* Designation Dropdown */}
                    <label className="block text-gray-700">Designation:</label>
                    <select
                        className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg bg-gray-100 focus:outline-none focus:border-blue-600 transition duration-300"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>

                    {/* Gender Radio Buttons */}
                    <label className="block text-gray-700">Gender:</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === 'Male'}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            />
                            <span className="ml-2">Male</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === 'Female'}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            />
                            <span className="ml-2">Female</span>
                        </label>
                    </div>

                    {/* Courses Checkboxes */}
                    <label className="block text-gray-700">Courses:</label>
                    <div className="space-x-4">
                        {['MCA', 'BCA', 'BSC'].map(courseOption => (
                            <label key={courseOption} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    value={courseOption}
                                    checked={course.includes(courseOption)}
                                    onChange={handleCourseChange}
                                />
                                <span className="ml-2">{courseOption}</span>
                            </label>
                        ))}
                    </div>

                    {/* Image Upload */}
                    
                    <label className="block text-gray-700">Upload Your Photo:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/jpeg, image/png"
                        className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg bg-gray-100 focus:outline-none focus:border-blue-600 transition duration-300"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-lg py-2 text-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Register Employee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEmployee;
