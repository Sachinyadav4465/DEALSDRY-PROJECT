import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState('');
  let [phone, setPhone] = useState('');
  let [designation, setDesignation] = useState('');
  let [gender, setGender] = useState('');
  let [courses, setCourses] = useState([]);
  let [image, setImage] = useState();

  let idObj = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4001/employee-list/${idObj.ID}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setDesignation(response.data.designation);
        setGender(response.data.gender);
        setCourses(response.data.course);
      })
      .catch(() => { console.log("Error fetching data"); });
  }, [idObj.ID]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCourses([...courses, value]);
    } else {
      setCourses(courses.filter(course => course !== value));
    }
  };

  const formHandle = (e) => {
    e.preventDefault();
    let payload = {
      name,
      email,
      phone,
      image,
      designation,
      gender,
      course: courses
    };
    axios.put(`http://localhost:4001/employee-list/${idObj.ID}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => { alert(response.data); })
      .catch(() => { console.log("Error updating data"); });

    navigate("/employee-list");
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-center font-bold text-2xl text-gray-700 mb-4'>Update Employee Data</h1>
        <form onSubmit={formHandle}>
          <input
            className='w-full border-2 border-gray-300 p-2 rounded mb-3'
            placeholder='Enter Full Name'
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); }}
          />
          <input
            className='w-full border-2 border-gray-300 p-2 rounded mb-3'
            placeholder='Enter Email'
            type="text"
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
          />
          <input
            className='w-full border-2 border-gray-300 p-2 rounded mb-3'
            placeholder='Enter Phone Number'
            type="text"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); }}
          />

          <label className='block text-gray-600 mb-1'>Designation</label>
          <select
            name="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="block w-full border-2 border-gray-300 p-2 rounded mb-3"
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>

          <label className='block text-gray-600 mb-1'>Gender:</label>
          <div className='mb-3'>
            <input type="radio" id="male" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
            <label htmlFor="male" className='ml-2'> Male </label>
            <input type="radio" id="female" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
            <label htmlFor="female" className='ml-2'> Female </label>
          </div>

          <label className='block text-gray-600 mb-1'>Course:</label>
          <div className='mb-3'>
            <input type="checkbox" id="MCA" name="course" value="MCA" checked={courses.includes('MCA')} onChange={handleCheckboxChange} />
            <label htmlFor="MCA" className='ml-2'> MCA </label>
            <input type="checkbox" id="BCA" name="course" value="BCA" checked={courses.includes('BCA')} onChange={handleCheckboxChange} />
            <label htmlFor="BCA" className='ml-2'> BCA </label>
            <input type="checkbox" id="BSC" name="course" value="BSC" checked={courses.includes('BSC')} onChange={handleCheckboxChange} />
            <label htmlFor="BSC" className='ml-2'> BSC </label>
          </div>

          <label className='block text-gray-600 mb-1'>Upload your photo:</label>
          <input type="file" name='image' onChange={(e) => { setImage(e.target.files[0]); }} className='mb-3' />
          <button className='bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-300'>Update Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
