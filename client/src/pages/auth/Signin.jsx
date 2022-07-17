import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { authenticate, isAuth } from '../../utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting...' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/auth/signin`,
      data: { email, password }
    })
      .then(response => {
        console.log('SUCCESS', response);

        authenticate(response, () => {
          setValues({
            ...values,
            email: '',
            password: '',
            buttonText: 'Submit'
          });
          toast.success(response.data.message);
        });
      })
      .catch(error => {
        console.log('ERROR', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error);
      });
  };

  const signinForm = () => (
    <form>
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
      <div className='pb-3'>
        <Link to='/forgot-password'>Forgot Password?</Link>
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
        {isAuth() && isAuth().role === 'admin'
          ? history.push('/admin')
          : isAuth() && isAuth().role === 'user'
          ? history.push('/user')
          : null}
        <h1 className='p-5 text-center'>Signin</h1>
        {signinForm()}
      </div>
    </>
  );
};

export default Signin;
