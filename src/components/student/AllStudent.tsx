import React, { useState, useEffect } from 'react';
import './all.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  dateOfAdmission: string;
}

const AllStudent = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get<Student[]>('http://localhost:5000/students/all-student');
        setStudents(response.data);
        setFilteredStudents(response.data); // Initialize filtered students
        toast.success('Students fetched successfully');
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to fetch students');
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (student: Student) => {
    try {
      await axios.delete(`http://localhost:5000/students/delete-student/${student._id}`);
      setStudents(students.filter(s => s._id !== student._id)); // Update state after deletion
      setFilteredStudents(filteredStudents.filter(s => s._id !== student._id)); // Update filtered list
      toast.success('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student');
    }
    setDeleteDialogOpen(false);
  };

  const openDeleteDialog = (student: Student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await axios.get<Student[]>(`http://localhost:5000/students/student-name/${query}`);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error('Error fetching student by name:', error);
        setFilteredStudents([]);
      }
    } else {
      setFilteredStudents(students);
    }
  };

  return (
    <div>
      <div className='tool'>
        <h1>Students</h1>
        <div className='tool-right'>
          <input
            type='text'
            placeholder='Search....'
            className='searchbox'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className='add' onClick={() => navigate('/add')}>
            Add-Student
          </button>
        </div>
      </div>

      <div className='std-list'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Enroll Number</th>
              <th>Date of Admission</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.enrollNumber}</td>
                <td>{student.dateOfAdmission}</td>
                <td>
                  <EditIcon onClick={() => handleEdit(student._id)} />
                </td>
                <td>
                  <DeleteIcon onClick={() => openDeleteDialog(student)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete {studentToDelete?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ width: '100%', justifyContent: 'space-around' }}>
          <Button onClick={() => handleDelete(studentToDelete as Student)} autoFocus style={{ backgroundColor: '#22C55E', color: 'white', width: '45%' }}>
            Yes
          </Button>
          <Button onClick={closeDeleteDialog} style={{ backgroundColor: '#8B4513', color: 'white', width: '45%' }}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllStudent;
