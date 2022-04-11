import React, { useState } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import './SignUp.css';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // console.log(email, passWord, confirmPass, error);

    const [createUserWithEmailAndPassword, user,  hookError] = useCreateUserWithEmailAndPassword(auth);

    if(hookError){
        console.log(hookError)
    }

    const getEmailValue = (e) =>{
        setEmail(e.target.value)
    }
    const getPassValue = (e) =>{
        setPassWord(e.target.value)
    }
    const getConfirmPassValue = (e) =>{
        setConfirmPass(e.target.value)
    }
    if(user){
        navigate("/")
    }

    const handleCreateUser = (e) =>{
        e.preventDefault();
        if(passWord !== confirmPass){
            setError("Wrong password! password did'n match");
            return;
        }
        if(passWord === confirmPass){
            setError("");
        }
        if(passWord.length < 6){
            setError("Must type 6 characters");
            return;
        }
        createUserWithEmailAndPassword(email, passWord);

    }

    return (
        <div>
            <h2>This is signUp page</h2>

            <div className='from-container'>
            <h2> Sign-Up </h2>
            <div className='from-div'>
                <form onSubmit={handleCreateUser}>
                    <label htmlFor="email">Email</label><br />
                    <input onBlur={getEmailValue} type="email" name='email' required/><br />

                    <label htmlFor="password">Password</label><br />
                    <input onBlur={getPassValue} type="password" name='password' required/><br />

                    <label htmlFor="confirm-password">Confirm Password</label><br />
                    <input onBlur={getConfirmPassValue} type="password" name='confirm-password' required/><br />
                    {error?  <p style={{color : "red"}}>{error}</p> : ''}

                    <input className='form-submit' type="submit" value="Sign-up"/>

                    <p>Already have a account signup..? <Link to="/login">Login</Link></p>

                    <div>
                        <span></span>
                        <p>or</p>
                        <span></span>
                    </div>

                    <button>Continue With Google</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default SignUp;