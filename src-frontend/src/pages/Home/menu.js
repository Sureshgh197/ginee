import React, { useState } from 'react'

import temp1 from '../../assets/images/temp/temp1.webp'
import temp2 from '../../assets/images/temp/temp2.webp'
import temp3 from '../../assets/images/temp/temp3.webp'
import temp4 from '../../assets/images/temp/temp4.webp'
import temp5 from '../../assets/images/temp/temp5.webp'
import temp6 from '../../assets/images/temp/temp6.webp'
import temp7 from '../../assets/images/temp/temp7.webp'
import temp8 from '../../assets/images/temp/temp8.webp'
import gif from '../../assets/images/filetypes/GIF.png';
import jpeg from '../../assets/images/filetypes/JPEG.png';
import png from '../../assets/images/filetypes/PNG.png';
import psd from '../../assets/images/filetypes/PSD.png';
import pdf from '../../assets/images/filetypes/pdf.png';
import tiff from '../../assets/images/filetypes/TIFF.png';
import square from '../../assets/images/square.png'
import { AiOutlineClose, AiFillCaretDown, AiFillLock } from 'react-icons/ai'
import { HiOutlineTemplate, HiOutlineAdjustments } from 'react-icons/hi'
import axios from 'axios';
import { devices } from '../../components/index';

//======== Language ================
import { workarea } from '../../config/lang/en.js'
import { FiToggleRight } from 'react-icons/fi'

export const Menu = ({ menu, handleCanvas, tabname, handleClose, saveImage, setMenu, handleNewtab }) => {


    //========== new doc rightbar start =====
    const [setting, setSetting] = useState({
        width: "",
        height: "",
        devicename:""
    });
    //========== new doc rightbar end =====

    const [format, setFormat] = useState('')
    const [imgname, setImgname] = useState('')
    const [imgnamePopup, setimgnamePopup] = useState(false)
    const [hover, setHover] = useState({
        menu: '0',
        submenu: '1'
    })
    const [toggle, setToggle] = useState({
        layout: false,
        color: false,
        margin: false,
        bleed: false,
        preset: false,
        format: false,
        resample: false,
    })

    const [extend, setExtend] = useState({
        changeBackground: true,
        d_units: true,
    })

    function removeBackgroundTab() {

        setExtend({ ...extend, changeBackground: !extend.changeBackground })
    }


    function openTab(evt, tabName) {
        // var i, tabcontent, tablinks;
        // tabcontent = document.getElementsByClassName("tabcontent");
        // tablinks = document.getElementsByClassName("tablinks");

        setHover({
            ...hover, menu: tabName
        })

    }

    // function handleSubmit() {
    //     setHover({ ...hover, menu: '0' });
    //     handleCanvas(size);
    // }

    // function handleTab() {
    //     setHover({ ...hover, submenu: '2' });
    //     setSize({ width: "", height: "" })
    // }

    function handlePopupClose(v) {
        handleClose(v);
        setHover({ ...hover, menu: '0' })
    }

    function handleMenu(e, val) {
        setHover({
            ...hover, menu: val
        })
        setMenu(0)
    }

    function handleDevice(e,w, h) {
        console.log(e)
        setSetting({ ...setting, 
            width: w,
            height: h,
            devicename : e.target.innerText })
    }


    return (
        <>
            <div className={menu == 1 ? 'hiddenmenu slides' : "hiddenmenu "} onMouseEnter={() => setMenu(1)} onMouseLeave={() => setMenu(0)} >
                <h6 className="tablinks" onClick={(e) => handleMenu(e, '1')} >Create new file</h6>
                <h6 className="tablinks" onClick={(e) => handleMenu(e, '2')}>Open</h6>
                {/* <h6 onClick={() => removeBackgroundTab}>Remove background image</h6> */}
                <h6>Open recent files</h6>
                <h6 onClick={(e) => setHover({ ...hover, menu: '3' })}>Close</h6>
                <h6>Close All</h6>
                <h6 onClick={(e) => setHover({ ...hover, menu: '4' })} >Export</h6>
            </div>

            <div className={menu == 2 ? 'hiddenmenu slides' : "hiddenmenu "} onMouseEnter={() => setMenu(2)} onMouseLeave={() => setMenu(0)}  >
                <h6>Undo</h6>
                <h6>Redo</h6>
                <h6 >Cut</h6>
                <h6>Copy</h6>
                <h6>Clear</h6>
                <h6>Clear All</h6>
            </div>
            <div className={menu == 3 ? 'hiddenmenu slides' : "hiddenmenu "} onMouseEnter={() => setMenu(3)} onMouseLeave={() => setMenu(0)}  >
                <h6>Sample</h6>
                <h6>Sample</h6>
                <h6 >Sample</h6>
                <h6>Sample</h6>
                <h6>Sample</h6>
            </div>
            <div id="createnew" draggable style={hover.menu == '1' ? { display: 'flex' } : { display: 'none' }} className="tabcontent">
                <h5>New Document</h5>
                <div>
                    <div className="menuleft">
                        <div>
                            <HiOutlineAdjustments />
                            <h6>Presets</h6>
                        </div>
                        <div>
                            <HiOutlineTemplate size='2x' />
                            <h6> Templates</h6>
                        </div>
                    </div>
                    <div className="menucenter">
                        <div className="options">
                            <h6>Presets</h6>
                            <h6>Devices</h6>
                        </div>
                        <div className='device'>
                            {
                                devices.map((i) => {
                                    return <div key={i.id} className='card' >
                                        <div onClick={(e) => handleDevice(e,i.width, i.height)} >
                                            <p name={i.devicename}>{i.devicename}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="menuright">
                        <input className='newdoc_search' placeholder='Search..'></input>
                        <div className='menurightlayers'>
                            <div className={toggle.layout ? 'max-o' : 'maxlayout'}>
                                <h6 onClick={() => setToggle({ ...toggle, layout: !toggle.layout })} className="heading"><AiFillCaretDown /> Layout</h6>
                                <div className={toggle.layout ? 'menuclose ' : 'menuopen'}>
                                    <div>
                                        <h6>{setting.devicename}</h6>
                                    </div>
                                    <div>
                                        <h6>Page width:</h6>
                                        <input value={setting.width + 'px'}></input>
                                    </div>
                                    <div>
                                        <h6>Page height:</h6>
                                        <input value={setting.height + 'px'}></input>
                                    </div>
                                    <div>
                                        <h6>DPI:</h6>
                                        <input></input>
                                    </div>
                                    <div>
                                        <h6>Documents units:</h6>
                                        <input></input>
                                    </div>
                                    <div>
                                        <h6>'Actual size'zoom:</h6>
                                        <input></input>
                                    </div>
                                </div>
                            </div>
                            <div className={toggle.color ? 'max-o' : 'maxcolor'}>
                                <h6 onClick={() => setToggle({ ...toggle, color: !toggle.color })} className="heading"><AiFillCaretDown />Color</h6>
                                <div className={toggle.color ? 'menuclose' : 'menuopen'}>
                                    <div>
                                        <h6>Color format:</h6>
                                        <input></input>
                                    </div>
                                    <div>
                                        <h6>Color profile:</h6>
                                        <input></input>
                                    </div>

                                    <div className="im">
                                        <input type='checkbox'></input>
                                        <h6 >Transparent Background</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={toggle.margin ? 'max-o' : 'maxbleed'}>
                                <h6 onClick={() => setToggle({ ...toggle, margin: !toggle.margin })} className="heading"><AiFillCaretDown />Margin</h6>
                                <div className={toggle.margin ? 'menuclose' : 'menuopen margin'}>
                                    <div className="im">
                                        <input type='checkbox'></input>
                                        <h6 >Include margins</h6>
                                    </div>
                                    <div>
                                        <h6>Left</h6>
                                        <input></input>
                                        <h6>Right</h6>
                                        <input></input>
                                    </div>
                                    <div>
                                        <h6>Top</h6>
                                        <input></input>
                                        <h6>Bottom</h6>
                                        <input></input>
                                    </div>
                                </div>
                            </div>
                            <div className={toggle.bleed ? 'max-o' : 'maxcolor'}>
                                <h6 onClick={() => setToggle({ ...toggle, bleed: !toggle.bleed })} className="heading"><AiFillCaretDown />Bleed</h6>
                                <div className={toggle.bleed ? 'menuclose' : 'menuopen margin'} >
                                    <div>
                                        <h6>Left</h6>
                                        <input></input>
                                        <h6>Right</h6>
                                        <input></input>
                                    </div>
                                    <div>
                                        <h6>Top</h6>
                                        <input></input>
                                        <h6>Bottom</h6>
                                        <input></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="last">
                            <button className="" onClick={function (e) { handleNewtab(setting); setHover(e, '0') }} >Create</button>
                            <button onClick={(e) => setHover(e, '5')} className="">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="open" style={hover.menu == '2' ? { display: 'block' } : { display: 'none' }} className="tabcontent">
                <h3 className=''>New <AiOutlineClose onClick={(e) => openTab(e, '0')} /></h3>
                <div className='templete'>
                    <div><img src={temp1}></img><p>Templete 1</p> </div>
                    <div> <img src={temp5}></img><p>Templete 2</p></div>
                    <div> <img src={temp6}></img><p>Templete 3</p></div>
                    <div> <img src={temp7}></img><p>Templete 4</p></div>
                    <div> <img src={temp8}></img><p>Templete 5</p></div>
                </div>
            </div>
            <div id='close' style={hover.menu == '3' ? { display: 'block' } : { display: 'none' }}>
                {/* <Popup message='ad' closePopup={() => setHover({ ...hover, menu: '0' })} tabname={tabname} handleClose={(val) => handleClose(val)} /> */}
                <div className="popup">
                    <h3>Do you want to save the changes made to the document "{tabname.currentTab.name} - {tabname.currentTab.id}" ?</h3>
                    <h5>your changes will be lost if you dont save them.</h5>
                    <div>
                        <button className="btn btn-primary" onClick={() => handlePopupClose(tabname.currentTab)}>Close</button>
                        <button className="btn btn-light" onClick={() => setHover({ ...hover, menu: '0' })}>Cancel</button>
                    </div>
                </div>
            </div>
            <div id='export' style={hover.menu == '4' ? { display: 'block' } : { display: 'none' }}>
                <h5>Export settings</h5>
                <div className='format'>
                    <div className={format == 'gif' ? 'active' : ''} onClick={() => setFormat('gif')}>
                        <img src={gif} />
                        <h5>GIF</h5>
                    </div>
                    <div className={format == 'jpeg' ? 'active' : ''} onClick={() => setFormat('jpeg')}>
                        <img src={jpeg} />
                        <h5>JPEG</h5>
                    </div>
                    <div className={format == 'png' ? 'active' : ''} onClick={() => setFormat('png')}>
                        <img src={png} />
                        <h5>PNG</h5>
                    </div>
                    <div className={format == 'psd' ? 'active' : ''} onClick={() => setFormat('psd')}>
                        <img src={psd} />
                        <h5>PSD</h5>
                    </div>
                    <div className={format == 'tiff' ? 'active' : ''} onClick={() => setFormat('tiff')}>
                        <img src={tiff} />
                        <h5>TIFF</h5>
                    </div>
                </ div>
                <div className='settings'>
                    <div>
                        <div>
                            <h5>Size:</h5>
                            <div className='width60'>
                                <input className='i25 input'></input>
                                <AiFillLock />
                                <input className='i25 input'></input>
                            </div>
                        </div>
                        <div>
                            <h5>Preset:</h5>
                            {/* <div className='width60'>
                                <input className='i50'></input>
                            </div> */}
                            <div id='font-picker' className={toggle.format ? 'expanded width60' : 'width60'}>
                                <button type='button' className='i50 input' onClick={() => setToggle({ ...toggle, format: !toggle.format })}>
                                    <p className='dropdown-font-family'>PNG</p>
                                    <p className='dropdown-icon finished'></p>
                                </button>
                                <ul className='font-list'>
                                    <li className='font-list-item'>
                                        <button type='button' value='bold' className='font-button'>PNG</button>
                                    </li>
                                    <li className='font-list-item'>
                                        <button type='button' value='italic' className='font-button'>JPEG</button>
                                    </li>
                                    <li className='font-list-item'>
                                        <button type='button' value='underline' className='font-button'>JIFF</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h5>Resample:</h5>
                            <div className='width60'>
                                <input className='i60 input'></input>
                            </div>
                        </div>
                        <div>
                            <h5>Area:</h5>
                            <div className='width60'>
                                <input className='i55 input'></input>
                            </div>
                        </div>
                        <div>
                            <input type='checkbox'></input>
                            <h5>Don't export layers hidden by Export</h5>
                        </div>

                    </div>
                </div>
                <div className='last'>
                    <button className="">More</button>
                    <button className="" onClick={function () { saveImage(format, imgname); setHover({ ...hover, menu: '0' }) }}>Export</button>
                    <button className="" onClick={() => setHover({ ...hover, menu: '0' })}>Cancel</button>
                </div>
                {imgnamePopup ? (
                    <div
                        className="exportdialog"
                        style={{
                            position: 'absolute',
                            zIndex: '5'
                        }}
                    >
                        <input className='form-control' placeholder='Enter name' onChange={(e) => setImgname(e.target.value)} value={imgname} />
                        <button className="btn btn-primary" onClick={function () { saveImage(format, imgname); setHover({ ...hover, menu: '0' }) }}>Export</button>

                    </div>
                ) : (
                    <> </>
                )}
            </div>
        </>
    )
}

export default Menu
