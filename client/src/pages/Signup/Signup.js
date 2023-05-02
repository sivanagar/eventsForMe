import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
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
    try {
      //ToDo Remove overidding of form state
      const { data } = await addUser({
        variables: { ...formState, username: formState["email"] },
      });
      Auth.saveInfo(data.addUser.user);
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h3>Start selling tickets for your event. Sign up below.</h3>
      <p>
        Already have an account? <Link to="/login">Login</Link>.
      </p>
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
          className="form-input"
          // placeholder='Your email'
          name="email"
          type="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
          required
        />

        <label>Create Password</label>
        <input
          className="form-input"
          // placeholder='******'
          name="password"
          type="password"
          id="password"
          value={formState.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        <label>Confirm Password</label>
        <input
          className="form-input"
          // placeholder='******'
          name="confirmPassword"
          type="confirmPassword"
          id="confirmPassword"
          value={formState.password}
          onChange={handleChange}
        />
        <button className="btn d-block w-100" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
