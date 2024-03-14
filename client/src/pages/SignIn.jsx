import React, { useState } from 'react';
import { Button, Input, OAuth } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure, changeState } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  
  const handleFocus = () => {
    if(error) dispatch(changeState(false));
  }
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form method="post" onSubmit={handleSubmit} className='flex flex-col gap-4'>
          
          <Input type="email" placeholder="Email" name="email" id="email" required onChange={handleChange} onFocus={handleFocus} />
          <Input type="password" placeholder="Password" name="password" id="password" required onChange={handleChange} onFocus={handleFocus} />
          {error ? <p className='text-error pl-3 text-sm'>{error.message}</p> : null}
          <Button type="submit" value={loading ? "Loading..." : "Sign In"} disabled={loading ? true : false} className='bg-secondary' />
        
        </form>
          
        <OAuth />

          <div className='flex gap-2 mt-2'>
            <p>Don&apos;t have an account? </p>
            <Link to="/sign-up">
              <span className='text-link'>Sign Up</span>
            </Link>
          </div>
    </div>
  )
}

export default SignIn;