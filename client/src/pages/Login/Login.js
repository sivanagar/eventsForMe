import React, { useState } from 'react';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
 <div>
  <h3>Login</h3>
  <p>Don't have an account yet? <a href="/sign-up">Sign up.</a></p>
  <label for="email">Your Email</label>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                // placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />

              <label for="password">Your Password</label>
              <input
                className='form-input'
                // placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>
            </div>
  );
};

export default Login;
