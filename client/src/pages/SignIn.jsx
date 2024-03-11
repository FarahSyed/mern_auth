import React, { useState } from 'react';
import { Button, Input } from '../components';
import { Link, useNavigate } from 'react-router-dom';


function SignIn() {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleFocus = () => {
    if(error) setError(false);
  }
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form method="post" onSubmit={handleSubmit} className='flex flex-col gap-4'>
          
          <Input type="email" placeholder="Email" name="email" id="email" required onChange={handleChange} onFocus={handleFocus} />
          <Input type="password" placeholder="Password" name="password" id="password" required onChange={handleChange} onFocus={handleFocus} />
          {error ? <p className='text-error pl-3 text-sm'>{error}</p> : null}
          <Button type="submit" value={loading ? "Loading..." : "Sign In"} disabled={loading ? true : false} bgColor='bg-secondary' />
          
          <div className='flex gap-2 mt-2'>
            <p>Don&apos;t have an account? </p>
            <Link to="/sign-up">
              <span className='text-link'>Sign Up</span>
            </Link>
          </div>
        </form>
    </div>
  )
}

export default SignIn;