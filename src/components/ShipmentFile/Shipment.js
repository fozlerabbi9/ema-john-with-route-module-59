import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const Shipment = () => {
    const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [pNumber, setPhNumber] = useState('');
    const [error, setError] = useState('');
    // console.log(name, email, address, pNumber);

    const [user] = useAuthState(auth);
    const { email } = user;

    const getNamelValue = (e) => {
        setName(e.target.value)
    }
    const getEmailValue = (e) => {
        // setEmail(e.target.value)
    }
    const getAddressValue = (e) => {
        setAddress(e.target.value)
    }
    const getPhNumberValue = (e) => {
        setPhNumber(e.target.value)
    }

    const handleCreateUser = (e) => {
        e.preventDefault();
        const shippingInfo = { name, email, address, pNumber };
        console.log(shippingInfo)
    }

    return (
        <div className='from-container'>
            <h2> Shipping Informatin </h2>
            <div className='from-div'>
                <form onSubmit={handleCreateUser}>
                    <label htmlFor="name">Name</label><br />
                    <input onBlur={getNamelValue} type="text" name='name' required /><br />

                    <label htmlFor="email">Email</label><br />
                    <input value={user?.email} readOnly type="email" name='email' required /><br />

                    <label htmlFor="address">Adderss</label><br />
                    <input onBlur={getAddressValue} type="text" name='addresss' required /><br />

                    <label htmlFor="phone-number">Phone Number</label><br />
                    <input onBlur={getPhNumberValue} type="number" name='phoneNumber' required /><br />
                    {error ? <p style={{ color: "red" }}>{error}</p> : ''}

                    <input className='form-submit' type="submit" value="Add Shipping" />

                    {/* <p>Already have a account signup..? <Link to="/login">Login</Link></p> */}

                    <div>
                        <span></span>
                        <p>or</p>
                        <span></span>
                    </div>

                    <button>Continue With Google</button>
                </form>
            </div>
        </div>
    );
};

export default Shipment;