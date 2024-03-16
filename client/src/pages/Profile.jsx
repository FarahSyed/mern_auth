import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Input } from '../components';


function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-6'>Profile</h1>
        <form className='flex flex-col gap-4'>
          <img src={currentUser.profilePicture} alt="profile" className='h-24 w-24 mt-2 self-center cursor-pointer rounded-full object-cover' />
          <Input type='text' id='userName' placeholder='Username' defaultValue={currentUser.userName} />
          <Input type='email' id='email' placeholder='Email' defaultValue={currentUser.email} />
          <Input type='password' id='password' placeholder='Password' />
          <Button value='Update' className='bg-secondary' />
        </form>

        <div className='flex justify-between mt-5'>
          <span className='text-error text-sm cursor-pointer'>Delete Account</span>
          <span className='text-error text-sm cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}

export default Profile;