import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { isAuth } from '../../utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { name, email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting...' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/auth/signup`,
      data: { name, email, password }
    })
      .then(response => {
        console.log('SUCCESS', response);

        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          buttonText: 'Submit'
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log('ERROR', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error);
      });
  };

  const signupForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange('name')}
          value={name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          className='form-control'
          onChange={handleChange('email')}
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          className='form-control'
          onChange={handleChange('password')}
          value={password}
        />
      </div>
      <div>
        <button className='btn btn-primary' onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        {isAuth() ? <Redirect to='/' /> : null}
        <h1 className='p-5 text-center'>Signup</h1>
        {signupForm()}
      </div>
    </>
  );
};

export default Signup;
