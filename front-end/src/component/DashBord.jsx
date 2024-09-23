import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const DashBord = () => {
  let [name, setName] = useState("");
  let [activePage, setActivePage] = useState("Dashboard"); // New state for active page
  let ID = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4001/user/${ID.ID}`)
      .then((response) => {
        setName(response.data); // Assuming response.data returns the admin's name
      })
      .catch(() => { console.log("Unable to fetch data"); });
  }, [ID.ID]);

  const handleLogout = () => {
    // Clear any user-related data if needed, like tokens
    // localStorage.removeItem('token'); // example if using tokens
    navigate('/login'); // redirect to login page
  };

  const handlePageChange = (page) => {
    setActivePage(page); // Update active page
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen flex flex-col">
      <div id='navbar' className='bg-white shadow-md p-4'>
        <ul className='flex gap-10 justify-center'>
          <li className='text-lg font-semibold text-gray-800'>Home</li>
          <li>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to='/create-employee'
              onClick={() => handlePageChange("Create Employee")}
            >
              Create Employee
            </Button>
          </li>
          <li>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/employee-list"
              onClick={() => handlePageChange("Employee List")}
            >
              Employee List
            </Button>
          </li>
          <li className='p-2 text-red-500 border border-dashed border-red-400'>
            {name} {/* Display the admin's name */}
          </li>
          <li>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </li>
        </ul>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className='text-white text-4xl font-bold'>Dashboard</h1>
        <p className='text-white text-lg mt-2'>Welcome to the admin panel!</p>
       
      </div>
    </div>
  );
}

export default DashBord;
