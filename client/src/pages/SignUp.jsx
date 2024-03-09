import React from 'react';
import { Button, Input } from '../components';
import { Link } from 'react-router-dom';


function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form action="" method="post" className='flex flex-col gap-4'>
          
          <Input type="text" placeholder="Username" name="userName" id="userName" />
          <Input type="email" placeholder="Email" name="email" id="email" />
          <Input type="password" placeholder="Password" name="password" id="password" />
          <Button type="submit" value="Sign Up" bgColor='secondary' />
          
          <div className='flex gap-2 mt-2'>
            <p>Have an account? </p>
            <Link to="/sign-in">
              <span className='text-link'>Sign In</span>
            </Link>
          </div>
        </form>
    </div>
  )
}

export default SignUp;