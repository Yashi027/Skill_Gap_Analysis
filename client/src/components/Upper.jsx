import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom';

const Upper = () => {
    const [open,setOpen] = useState(false)
  return (
    <div className='min-h-screen'>
      <Navbar open={open} setOpen={setOpen}/>  
      <div className='flex h-full'>
            {open && <Sidebar setOpen={setOpen}/>}
            <div className='flex-1 p-6'>
              <Outlet/>
            </div>
      </div>
    </div>
  );
}

export default Upper;
