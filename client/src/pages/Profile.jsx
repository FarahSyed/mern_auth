import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input } from '../components';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../config/firebaseConfig';


function Profile() {

  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  
  const setImageRef = () => {
    setImageError(false);
    setImagePercent(0);
    fileRef.current.click();
  }
  
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({...formData, profilePicture: downloadURL})
        );
      }
    )

  };

  
  useEffect(() => {
    if(image) {
      handleFileUpload(image);
      setImage(undefined);
    }
  }, [image]);

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-6'>Profile</h1>
        <form className='flex flex-col gap-4'>
          <input type='file' className='bg-transparent' ref={fileRef} hidden accept='image/*' onChange={e => setImage(e.target.files[0])} />
          <img src={formData.profilePicture || currentUser.profilePicture} alt="profile" className='h-24 w-24 mt-2 self-center cursor-pointer rounded-full object-cover' onClick={setImageRef} />
          <p className='text-sm self-center'>
            {imageError ? (
                  <span className='text-error'>Error: Image size must be less than 2MB</span>
                )
              : imagePercent > 0 && imagePercent < 100 ? (
                  <span>Uploading: {imagePercent}%</span>
                )
              : imagePercent === 100 ?
                (
                  <span className='text-green-600'>Image uploaded successfully</span>
                )
              : ''
            }
          </p>
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