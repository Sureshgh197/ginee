import React, { useState } from 'react'
import './header.scss'
// import './header1.scss'
import logo from '../../assets/images/ic.svg'
import icon from '../../assets/images/1.svg'
import icon1 from '../../assets/images/2.svg'
import icon2 from '../../assets/images/3.svg'
import icon3 from '../../assets/images/4.svg'
import icon4 from '../../assets/images/5.svg'
import icon5 from '../../assets/images/6.svg'
import icon6 from '../../assets/images/7.svg'
import icon7 from '../../assets/images/8.svg'
import rec from '../../assets/images/rec.png'
import rec1 from '../../assets/images/rec1.png'
import rec2 from '../../assets/images/rec2.png'
import rec3 from '../../assets/images/rec3.png'
import rec4 from '../../assets/images/rec4.png'
import gear from '../../assets/images/settings.svg'
import profile from '../../assets/images/avatar.svg';
import team from '../../assets/images/team.svg';
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Header1 } from './header1.js'
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'x-csrftoken';


export const Header = () => {
    const [cls, setcls] = useState();
    const [menu, setmenu] = useState({
        apps: false,
        filemenu: false,
        profile: false
    });


    const [expand, setExpand] = useState(false)
    const [first, setfirst] = useState(false)
    const [second, setsecond] = useState(false)
    // const [i, setI] = useState()


    const navigate = useNavigate();

    function handleClass(e) {
        var id = e.target.id;
        id == cls ? setcls('0') : setcls(id);
    }

    const headers = {
        'Content-Type': 'application/json',
        // "access-control-allow-origin": "*",
        "Access-Control-Allow-Origin": "*",
        // 'withCredentials': true,
        // "xsrfCookieName": 'csrftoken'
        // "xsrfHeaderName": 'x-csrftoken'
    }

    async function handleLogout() {
        try {
            await axios.post('http://13.233.34.229:8000/auth/logout/', {
                headers: headers
            }).then((res) => {
                if (res.status == 200) {
                    {
                        switch (res.data.state) {
                            case 'USER_LOGGED_OUT':
                                navigate('/login');
                                break;
                            case 'ANONYMOUS_USER':
                                alert('Anonymous user')
                                navigate('/');
                                break;
                            default:
                                navigate('/');
                        }
                    }
                } else {
                    alert('Server error')
                }
            })
        } catch (error) {

        }
    }

    return (
        <>
            {/* <Header1 /> */}
            <div className='design_app_header'>
                <div>
                    <img src={logo} className='logo' />
                    <div id='rectanglee' className={cls == "1" ? ' slides' : "collapses"} onClick={(e) => handleClass(e)}>
                        <img src={icon} id='1' className='appicon' />
                        <div className=''>
                            <img src={rec} className='subapps' />
                            <img src={rec1} className='subapps' />
                            <img src={rec2} className='subapps' />
                            <img src={rec3} className='subapps' />
                            <img src={rec4} className='subapps' />
                        </div>
                    </div>
                    <div id='rectanglee' className={cls == "2" ? 'slides' : "collapses"} onClick={(e) => handleClass(e)}>
                        <img src={icon1} id='2' className='appicon' />
                        <div className='sub'>
                            <img src={rec} className='subapps' />
                            <img src={rec1} className='subapps' />
                            <img src={rec2} className='subapps' />
                            <img src={rec3} className='subapps' />
                        </div>
                    </div>
                    <div id='rectanglee' className={cls == "3" ? ' slides' : "collapses"} onClick={(e) => handleClass(e)}>
                        <img src={icon2} id='3' className='appicon' />
                        <div className='sub'>
                            <img src={rec} className='subapps' />
                            <img src={rec1} className='subapps' />
                            <img src={rec2} className='subapps' />
                            <img src={rec3} className='subapps' />
                        </div>
                    </div>

                    <div id='rectanglee' className={cls == "4" ? ' slides' : "collapses"} onClick={(e) => handleClass(e)}>
                        <img src={icon3} id='4' className='appicon' />
                        <div className='sub'>
                            <img src={rec} className='subapps' />
                            <img src={rec1} className='subapps' />
                            <img src={rec2} className='subapps' />
                            <img src={rec3} className='subapps' />
                            <img src={rec4} className='subapps' />
                        </div>
                    </div>
                    <div id='rectanglee' className={cls == "5" ? ' slides' : "collapses"} onClick={(e) => handleClass(e)}>
                        <img src={icon4} id='5' className='appicon' />
                        <div className='sub'>
                            <img src={rec} className='subapps' />
                            <img src={rec1} className='subapps' />
                            <img src={rec2} className='subapps' />
                            <img src={rec3} className='subapps' />
                            <img src={rec4} className='subapps' />
                        </div>
                    </div>
                    <div id='rectanglee' className={cls == "6" ? ' slides' : "collapses"} onClick={(e) => handleClass(e)}>
                        <img src={icon5} id='6' className='appicon' />
                        <div className='sub'>
                            <img src={rec} className='subapps' />
                            <img src={rec1} className='subapps' />
                            <img src={rec2} className='subapps' />
                            <img src={rec3} className='subapps' />
                            <img src={rec4} className='subapps' />
                        </div>
                    </div>
                    <div id='rectanglee' className={cls == "7" ? ' slides' : "collapses"} onClick={(e) => handleClass(e)}>
                        <img src={icon6} id='7' className='appicon' />
                        <div className='sub'>
                            <img src={rec} className='subapps' />
                            <img src={rec1} className='subapps' />
                            <img src={rec2} className='subapps' />
                            <img src={rec3} className='subapps' />
                            <img src={rec4} className='subapps' />
                        </div>
                    </div>
                    <div id='rectanglee' className={cls == "8" ? ' slides' : "collapses"} onClick={(e) => handleClass(e)}>
                        <img src={icon7} id='8' className='appicon' />
                        <div className=''>
                            <img src={rec} className='subapps' />
                            <img src={rec1} className='subapps' />
                            <img src={rec2} className='subapps' />
                            <img src={rec3} className='subapps' />
                            <img src={rec4} className='subapps' />
                        </div>
                    </div>


                </div>
                <div>
                    <img src={team} className='subapp' />
                    <img src={gear} className='subapp' />
                    {/* <Link to='/profile' ><img src={profile} className='subapp' /></Link> */}
                    <img src={profile} onClick={() => setmenu({ ...menu, profile: !menu.profile })} className='subapp' />

                </div>
                <div className='mobile'>
                    <div className='mobilemenu'>
                        <GiHamburgerMenu onClick={() => setmenu({ ...menu, apps: !menu.apps })} />
                        <div className={menu.apps ? "slider show" : "slider hide"}>
                            <p><img src={icon} id='1' className='appicon' /> Data</p>
                            <p><img src={icon1} id='1' className='appicon' /> Content</p>
                            <p><img src={icon2} id='1' className='appicon' /> Automate</p>
                            <p><img src={icon3} id='1' className='appicon' /> Lead Generation</p>
                            <p><img src={icon4} id='1' className='appicon' /> Sales</p>
                            <p><img src={icon5} id='1' className='appicon' /> Nuture</p>
                            <p><img src={icon6} id='1' className='appicon' /> Collaboration</p>
                            <p><img src={icon7} id='1' className='appicon' /> Intelligence</p>
                            <p>Profile</p>
                            <p> Setting</p>
                            <p> Edit</p>
                        </div>
                    </div>
                    <div>
                        <BsThreeDots onClick={() => setmenu({ ...menu, filemenu: !menu.filemenu })} color='white' size='24px' className='subapp' />
                        <img src={team} className='subapp' />
                        <img src={gear} className='subapp' />
                        {/* <img src={profile} onClick={() => setmenu({...menu, profile: !menu.profile})} className='subapp' /> */}
                        <img src={profile} />
                    </div>
                </div>

                <div className={menu.profile ? "profilemenu transform" : " profilemenuhide transform "}>
                    <p>Account</p>
                    <p>Settings</p>
                    <p>Messages</p>
                    <p onClick={() => handleLogout()}>Logout</p>
                </div>
                <div id='file' className={menu.filemenu ? "filemenushow transform" : "filemenu transform"}>
                    <p>Files</p>
                    <p>Edit</p>
                    <p>Create a new file</p>
                    <p>Window</p>
                    <p>About</p>
                </div>
            </div>
        </>
    )
}
