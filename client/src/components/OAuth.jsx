import React from 'react';
import { Button } from './index';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../config/firebaseConfig';
import { useDispatch } from 'react-redux';
import { changeState, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleAuth = async () => {
        dispatch(changeState(false));   // Set any previous error to false
        try {
            const provider = new GoogleAuthProvider();  // Create provider
            const auth = getAuth(app);  // Initialize getAuth and app
            
            // Get result from Google
            const result = await signInWithPopup(auth, provider);

            // Send the user info to database
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                })
            });

            // Get data from database
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data));
                return;
            }
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            dispatch(signInFailure(error));
        }
    };

    return (
        <Button type="button" value="Continue with Google" className='w-full my-3 bg-primary' onClick={handleGoogleAuth} />
    )
}

export default OAuth;