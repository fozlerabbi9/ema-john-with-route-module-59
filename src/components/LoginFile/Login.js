import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';



const Login = () => {
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    // console.log(user);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    const getEmailValue = (e) => {
        setEmail(e.target.value)
    }
    const getPassValue = (e) => {
        setPassWord(e.target.value)
    }
    if(user){
        navigate(from, {replace : true})        
    }

    const logInFUn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, passWord)

    }

    return (
        <div className='from-container'>
            <h2> Login </h2>
            <div className='from-div'>
                <form onSubmit={logInFUn}>
                    <label htmlFor="">Email</label><br />
                    <input onBlur={getEmailValue} type="email" name='email' required /><br />

                    <label htmlFor="">Password</label><br />
                    <input onBlur={getPassValue} type="password" name='password' required /><br />

                    <input className='form-submit' type="submit" value="Login" />

                    <p>New to ema-john..? <Link to="/signUp">Create a new account</Link></p>

                    <p style={{ color: "red" }}>{error?.message}</p>
                    {
                        loading && <p>Loading...</p>
                    }


                    <div>
                        <span></span>
                        <p>or</p>
                        <span></span>
                    </div>

                    <button>Continue With Google</button>
                </form>
            </div>

            {
                user ? <p>{user?.user.email}</p> : ""
            }

        </div>
    );
};

export default Login;