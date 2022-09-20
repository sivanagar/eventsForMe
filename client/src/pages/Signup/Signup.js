import React, { useState } from 'react';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });

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
  };

  return (
   <div> 
    <h3>Start selling tickets for your event. Sign up below.</h3>
    <p>Already have an account? <a href="/login">Login</a>.</p>
            <form onSubmit={handleFormSubmit}>
              {/* <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              /> */}
              <label>Your Email</label>
              <input
                className='form-input'
                // placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />

              <label>Create Password</label>
              <input
                className='form-input'
                // placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <label>Confirm Password</label>
                            <input
                className='form-input'
                // placeholder='******'
                name='confirmPassword'
                type='confirmPassword'
                id='confirmPassword'
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

export default Signup;
