import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const EmployeeList = () => {
    let [infoFromDB, setInfoFromDB] = useState([]);
    let [reload, setReload] = useState(0);
    let [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get("http://localhost:4001/employee-list")
            .then((response) => {
                setInfoFromDB(response.data);
            })
            .catch(() => {
                console.log("Error from EmployeeList useEffect");
            });
        setReload(1);
    }, [reload]);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:4001/employee-list/${id}`)
            .then(() => setReload(2))
            .catch(() => console.log("Error deleting user"));
    };

    const filteredEmployees = infoFromDB.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='w-screen p-5'>
            <div className='flex flex-col mb-4'>
                <p>Total Count: {filteredEmployees.length}</p>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded p-1 mt-2 w-48"
                    style={{ height: '30px' }}
                />
            </div>
            <table className='w-full border border-gray-300'>
                <thead className='border border-black'>
                    <tr>
                        <th className='px-7 py-2'>Unique Id</th>
                        <th className='px-7 py-2'>Image</th>
                        <th className='px-7 py-2'>Name</th>
                        <th className='px-7 py-2'>Email</th>
                        <th className='px-7 py-2'>Phone</th>
                        <th className='px-7 py-2'>Designation</th>
                        <th className='px-7 py-2'>Gender</th>
                        <th className='px-7 py-2'>Course</th>
                        <th className='px-12 py-2'>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center text-[15px]'>
                    {filteredEmployees.map((item, i) => (
                        <tr key={item.id}>
                            <td className='border-2 border-green-700'>{i + 1}</td>
                            <td className='border-2 border-green-700'>
                                <img src={`backend/Images/${item.image}`} alt="" className="w-16 h-16 object-cover" />
                            </td>
                            <td className='border-2 border-green-700'>{item.name}</td>
                            <td className='border-2 border-green-700'>{item.email}</td>
                            <td className='border-2 border-green-700'>{item.phone}</td>
                            <td className='border-2 border-green-700'>{item.designation}</td>
                            <td className='border-2 border-green-700'>{item.gender}</td>
                            <td className='border-2 border-green-700'>{item.course.join(', ')}</td>
                            <td className='border-2 border-green-700'>
                                <Link to={`/edit-employee/${item._id}`}>Edit</Link>
                                <Button variant="outlined" color="error" onClick={() => { deleteUser(item._id) }}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
