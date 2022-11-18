import React, { useState } from 'react';
import './header1.scss';
import icon from '../../assets/images/1.svg'
import rec from '../../assets/images/rec.png'
import rec1 from '../../assets/images/rec1.png'
import rec2 from '../../assets/images/rec2.png'
import rec3 from '../../assets/images/rec3.png'
import rec4 from '../../assets/images/rec4.png'

export const Header1 = () => {
    const [cls, setcls] = useState();

    function handleClass(e) {
        var id = e.target.id;
        id == cls ? setcls('0') : setcls(id);
    }

    return (
        <div className="header">
            <div>
                <div id='rectanglee' className={cls == "1" ? ' slides' : "collapses"} onClick={(e) => handleClass(e)}>
                    <img src={icon} id='1' className='appicons' />
                    <div className='sub'>
                        <img src={rec} className='subapps' />
                        <img src={rec1} className='subapps' />
                        <img src={rec2} className='subapps' />
                        <img src={rec3} className='subapps' />
                        <img src={rec4} className='subapps' />
                    </div>
                </div>
            </div>
        </div>
    )
}
