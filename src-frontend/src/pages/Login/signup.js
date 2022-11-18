import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import './login.scss';
import axios from 'axios';

export const Signup = ({handleclick}) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
  email: "",
  password: "",
  fname: "",
  lname: "",
  phone: "",
})
  function handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    setState({...state,
      [name]: value
    });
  }

 async function handleSubmit(e){
    e.preventDefault();
    console.log(state);

    await axios.post('http://127.0.0.1:8000/auth/register/',
    { 
        "first_name":state.fname,
        "last_name":state.lname,
        "password":state.password,
        "email":state.email,
        "phone":state.phone
    })
    navigate('/login')
    

  //  await axios.post('http://127.0.0.1:8000/auth/register',{    // replace url here with (apostrophe)
  //     headers: { Authorization: `Bearer ${'here'}}` }  //// token goes there without '' (apostraphe)
  //   }, {
  //     data: state
  //   })
  }

  return (
    <div className="formCenter">
      <form onSubmit={(e) => handleSubmit(e)} className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="fname">
            Full Name
          </label>
          <input
            type="text"
            id="fname"
            className="formFieldInput"
            placeholder="Enter your First name"
            name="fname"
            value={state.fname}
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="lname">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            className="formFieldInput"
            placeholder="Enter your last name"
            name="lname"
            value={state.lname}
            onChange={(e)=> handleChange(e)}
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
            onChange={(e)=> handleChange(e)}
          />
        </div>
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
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="phone">
            Mobile number
          </label>
          <input
            type="phone"
            id="phone"
            className="formFieldInput"
            placeholder="Enter your mobile number"
            name="phone"
            value={state.phone}
            onChange={(e)=> handleChange(e)}
          />
        </div>

     

        <div className="formField">
          <button className="formFieldButton" type='submit'>Sign Up</button>{" "}
          <div className="formFieldLink" onClick={() => handleclick()}>
            I'm already member
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup
