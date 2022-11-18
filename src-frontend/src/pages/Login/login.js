import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import google from '../../assets/google.png'
import facebook from '../../assets/facebook.png'


export const Login = ({ handleclick }) => {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    email: "",
    password: ""
  })

  function handleSubmit(event) {
    event.preventDefault();
    var token = ''

    axios.post('http://127.0.0.1:8000/auth/login_cred/',
      {

        "email": state.email,
        "password": state.password
      })


    // axios.post('/', {
    //   headers: { Authorization: `Bearer ${token}` }
    // }, {

    // })
    navigate('/')
  }


  function handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    setstate({
      ...state,
      [name]: value
    });
  }

  function connectFacebook(e) {
    e.preventDefault();
    window.location.href='http://google.com';
  }

  function connectGoogle() {
    axios.post('', {

    }, {

    })
  }

  return (

    <div className="formCenter">
      <form className="formFields" onSubmit={(e) => handleSubmit(e)}>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email"
            name="email"
            value={state.email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            value={state.password}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="formField">
          <button className="formFieldButton" type='submit'>Sign in</button>
          <div onClick={() => handleclick} className="formFieldLink">
            Create an account
          </div> <br />
          <br />
        </div>
      </form>

      <button className="formFieldButton button" onClick={(e) => connectGoogle(e)}><img src={google} width='20' height={20}></img> Login with Google </button>
      <button className="formFieldButton button" onClick={(e) => connectFacebook(e)}><img src={facebook} width='20' height={20}></img> Login with facebook </button>

    </div>
  )
}

export default Login
