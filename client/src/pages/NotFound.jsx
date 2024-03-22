import React from 'react';


function NotFound() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className='mb-4 text-5xl md:text-7xl font-bold text-slate-800'>404 Error</h1>
        <h1 className='text-2xl md:text-4xl font-bold text-slate-800 uppercase'>Page Not Found</h1>
    </div>
  )
}

export default NotFound;