import React, { useState } from 'react'
import Ginee from '../../assets/images/ginee.svg'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'x-csrftoken';

const Loginn = () => {
    const [pages, setPages] = useState(true);
    const [state, setState] = useState({
        email: '',
        password: ''
    });
    const [register, setRegister] = useState({
        email: "",
        password: "",
        full_name: "",
        organization: ""
    })

    const [err_login, setErr_Login] = useState({
        email: false,
        password: false
    })

    const [err_regis, setErr_Regis] = useState({
        re_email: false,
        password: false,
        full_name: false,
        organization: false
    })

    const headers = {
        'Content-Type': 'application/json',
        // "access-control-allow-origin": "*",
        "Access-Control-Allow-Origin": "*",
        // 'withCredentials': true,
        // "xsrfCookieName": 'csrftoken'
        // "xsrfHeaderName": 'x-csrftoken'
    }



    const navigate = useNavigate()

    function handleState(e) {
        var value = e.target.value;
        var name = e.target.name;

        setState({
            ...state, [name]: value
        })
        setErr_Login({
            err_login, [name]: true
        })
    }

    async function handleLogin(e) {
        try {
            // await axios.post(`${process.env}${login}`, {

            await axios.post('http://13.233.34.229:8000/auth/login/', {
                email: state.email,
                password: state.password
            }, {
                headers: headers
            }).then((response) => {
                if (response.status == 200) {
                    {
                        console.log(response)
                        switch (response.data.state) {
                            case 'USER_LOGGED_IN':
                                navigate('/home');
                                break;
                            case 'USER_ACCOUNT_NOT_VERIFIED':
                                alert('Account is not verified')
                                setErr_Login({
                                    ...err_login, email: true, password: true
                                })
                                navigate('/signup');
                                break;
                            case 'USER_INVALID_CREDENTIALS':
                                alert('Username/Password is incorrect')
                                navigate('/');
                                break;
                            case 'USER_DOES_NOT_EXIST':
                                alert('User does not exist')
                                navigate('/signup');
                                break;
                            default:
                                navigate('/signup');
                        }
                    }
                } else {
                    alert('Server error')
                }
            })

        } catch (error) {
            console.error(error)
        }

    }


    async function handleSignup() {
        try {
            await axios.post('http://13.233.34.229:8000/auth/register/', {
                "email": register.email,
                "password": register.password,
                "full_name": register.full_name,
                "organization": register.organization
            }, {
                headers: headers
            }).then((res) => {
                if (res.status == 200) {
                    {
                        console.log(res)
                        switch (res.data.state) {
                            case 'USER_EXISTS':
                                break;
                            case 'USER_REGISTERED':
                                alert('EMAIL_SENT')
                                break;
                            case 'USER_REGISTERED':
                                alert('EMAIL_SENT_UNSUCCESSFUL')
                                break;
                            case 'REGISTRATION_UNSUCCESSFUL':
                                alert('REGISTRATION_UNSUCCESSFUL')
                                break;
                            default:
                                navigate('/signup');
                        }
                    }
                } else {
                    alert('Server error')
                }
            })
        } catch (error) {

        }
    }

    function handleRegister(e) {
        var val = e.target.value;
        var name = e.target.name;

        setRegister({
            ...register, [name]: val
        })
    }


    return (
        <div className='login'>
            <div style={pages ? { display: 'flex' } : { display: 'none' }} className='logincard'>
                <div className='top'>
                    <div className='logo'>
                        <img src={Ginee}></img>
                        <h6>Don't have an account? <a onClick={() => setPages(false)}>Sign up</a></h6>
                    </div>
                    <div className='inputs'>
                        <h6>Email Address</h6>
                        <input name='email' className={err_login.email ? 'error' : ''} value={state.email} onChange={(e) => handleState(e)}></input>
                    </div>
                    <div className='inputs'>
                        <h6>Password</h6>
                        <h6>Show Password</h6>
                        <input name='password' type='password' className={err_login.password ? 'error' : ''} value={state.password} onChange={(e) => handleState(e)}></input>
                        <h6>Forget my password</h6>
                    </div>
                    <div className='rememberme'>
                        <div>
                            <input type='checkbox'></input>
                            <h6>Remember me</h6>
                        </div>
                    </div>
                    <div className='button'>
                        <button className='btn btn-danger' onClick={() => handleLogin()}>Login</button>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='copyright'>
                        <h6>© 2022 Ginee,inc. All Rights Reserved.</h6>
                        <h6>Privacy policy</h6>
                    </div>
                </div>
            </div>
            <div style={pages == false ? { display: 'flex' } : { display: 'none' }} className='logincard'>
                <div className='top'>
                    <h2>Sign in</h2>
                    <div className='inputs'>
                        <h6>User name</h6>
                        <input type="text" className={err_regis.full_name ? 'error' : ''} name='full_name' value={register.full_name} onChange={(e) => handleRegister(e)}></input>
                    </div>
                    <div className='inputs'>
                        <h6>Email address</h6>
                        <input type="email" className={err_regis.re_email ? 'error' : ''} name='re_email' value={register.email} onChange={(e) => handleRegister(e)}></input>
                    </div>
                    <div className='inputs'>
                        <h6>Organisation</h6>
                        <input type="text" className={err_regis.organization ? 'error' : ''} name='organization' value={register.organization} onChange={(e) => handleRegister(e)}></input>
                    </div>
                    <div className='inputs'>
                        <h6>Password</h6>
                        <input type="password" className={err_regis.password ? 'error' : ''} name='password' value={register.password} onChange={(e) => handleRegister(e)}></input>
                    </div>
                    <div className='button'>
                        <button className='btn btn-danger' onClick={(e) => handleSignup(e)}>Sign up</button>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='copyright'>
                        <h6>Didn't have account <a onClick={() => setPages(true)}>Sign in</a></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginn