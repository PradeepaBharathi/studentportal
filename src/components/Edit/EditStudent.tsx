import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Add/add.css';
import './edit.css'

interface Student {
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  dateOfAdmission: string;
}

const EditStudent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate=useNavigate()
  const [student, setStudent] = useState<Student>({
    name: '',
    email: '',
    phone: '',
    enrollNumber: '',
    dateOfAdmission: '',
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get<Student>(`https://studentbackend-2vhx.onrender.com/students/student/${id}`);
        setStudent(response.data);
      
      } catch (error) {
        console.error('Error fetching student details:', error);
        toast.error('Failed to fetch student details');
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/students/edit-student/${id}`, student);
      console.log(response.data); 

      toast.success('Student updated successfully');
      navigate("/")
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Failed to update student');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="addStudent">
      <div className="student-box">
        <h3 className="student-header">Edit Student</h3>
        <div className="student-content">
          <form onSubmit={handleSubmit} className='formedit'>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
              name="name"
              value={student.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              type="email"
              required
              name="email"
              value={student.email}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              type="tel"
              required
              name="phone"
              value={student.phone}
              onChange={handleChange}
            />
            <TextField
              label="EnrollNumber"
              type="text"
              required
              name="enrollNumber"
              value={student.enrollNumber}
              onChange={handleChange}
            />
            <TextField
              type="date"
              required
              name="dateOfAdmission"
              value={student.dateOfAdmission}
              onChange={handleChange}
            />
            <button type="submit" className="add" style={{ width: '100%', marginTop: '1rem' }}>
              Update student
            </button>
            <Button type="button" className="cancel">
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
