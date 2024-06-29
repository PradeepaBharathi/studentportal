import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './add.css';
import { useNavigate } from 'react-router-dom';

const AddStudent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enrollNumber: '',
    dateOfAdmission: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/students/create-student', formData);
      console.log(response.data); 

      toast.success('Student added successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Clear form fields after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        enrollNumber: '',
        dateOfAdmission: '',
      });
    } catch (error) {
      console.error('Error adding student:', error);

      toast.error('Failed to add student. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="addStudent">
      <div className="student-box">
        <h3 className="student-header">Add Student</h3>
        <div className="student-content">
        
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              type="tel"
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              label="EnrollNumber"
              type="text"
              required
              name="enrollNumber"
              value={formData.enrollNumber}
              onChange={handleChange}
            />
            <TextField
              type="date"
              required
              name="dateOfAdmission"
              value={formData.dateOfAdmission}
              onChange={handleChange}
            />
            <button type="submit" className="add" onClick={handleSubmit}>
              Add student
            </button>
            <button type="button" className="cancel" onClick={() => setFormData({
              name: '',
              email: '',
              phone: '',
              enrollNumber: '',
              dateOfAdmission: '',
            })}>
              Cancel
            </button>
         
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddStudent;
