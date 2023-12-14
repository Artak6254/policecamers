import React, { useState } from 'react';
import { regions } from '../api/Api';
import {useNavigate} from 'react-router-dom'




function AdminAdd({ setAdminData }) {
  const [newItem, setNewItem] = useState({
    title: '',
    image: '',
    link: '',
  });
const navigate = useNavigate();
  const handleCreate = async () => {
    if (!newItem.title || !newItem.image || !newItem.link) {
        alert('Please fill in all fields before creating a new item');
        return;
      }
    
    try {
      const response = await fetch('http://localhost:8801/addCamera', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        regions().then((res) => {
          setAdminData(res);
          localStorage.setItem('adminData', JSON.stringify(res));
        });
        console.log('Item created successfully');
        setNewItem({
          title: '',
          image: '',
          link: '',
        });
      } else {
        console.error('Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div className='flex justify-center items-center rounded-sm'>
      <button className='bg-slate-700 text-white text-[14px] p-1 rounded-full' onClick={() => navigate("/")}>Go Back</button>
      <div className='w-full max-w-screen-lg bg-slate-600 p-2 rounded-sm ml-2'>
        <div className='flex space-x-4'>
          <label className='flex-1'>
            <input
              type='text'
              value={newItem.title}
              placeholder='write Title'
              className='w-full p-2 border-none outline-none rounded-md'
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            />
          </label>
          <label className='flex-1'>
            <input
              type='text'
              value={newItem.image}
              placeholder='write Image URL'
              className='w-full p-2 border-none outline-none rounded-md'
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
            />
          </label>
          <label className='flex-1'>
            <input
              type='text'
              value={newItem.link}
              placeholder='write Link'
              className='w-full p-2 border-none outline-none rounded-md'
              onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
            />
          </label>
        </div>
        <button className='w-full p-2 mt-2 bg-green-600 hover:bg-green-700 rounded-md text-white' onClick={handleCreate}>
          Create New Item
        </button>
      </div>
    </div>
  );
}

export default AdminAdd;
