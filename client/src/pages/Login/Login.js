import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { ImEye, ImEyeBlocked } from "react-icons/im";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "", formErrors: {email: "", password: ""}, emailValid: false, passwordValid: false, formValid: false });
  const [login, { error }] = useMutation(LOGIN);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      //setItem user to localStorage
      Auth.saveInfo(data.login.user);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

// toggle eye hide and show password

    // toggle the type attribute

    // toggle the eye slash icon
 


  return (
    <div>
      <h3>Login</h3>
      <p>
        Don't have an account yet? <Link to="/sign-up">Sign up.</Link>
      </p>
      <label for="email">Your Email</label>
      <form onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          name="email"
          type="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
          required
        />

        <label for="password">Your Password</label>
        <ImEyeBlocked class="closed-eye" id="togglePassword" />
        <input
          className="form-input"
          name="password"
          type="password"
          id="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
       
       <br/>
       <ImEye class="eye" />
        <button className="btn d-block w-100" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
