import React, { useState, useEffect } from 'react';
import FontPicker from "font-picker-react";
import { homepage } from '../../config/api'
import { FiAlignLeft, FiAlignCenter, FiAlignRight, FiAlignJustify } from 'react-icons/fi'
import { CgFormatLineHeight } from 'react-icons/cg'
import { AiOutlineSearch } from 'react-icons/ai'
import { Pixabay, Pexels, Unsplash, Dropdown } from '../../components';
import axios from 'axios';
import pixabay from '../../assets/images/pixabay.png'
import pexel from '../../assets/images/pexels.png'
import uns from '../../assets/images/unsplash.png'
import { SketchPicker } from 'react-color';

export const Rightbar = () => {

    const [show, setShow] = useState(0)
    const [imgsearch, setImgsearch] = useState('');
    const [styles, setstyles] = useState({
        style: 'Bold',
        textsize: '10',
        default: 'Open Sans'
    })

    const [pages, setpages] = useState({
        pixabay: 2,
        pexel: 2,
        unsplash: 2
    })
    const [state, setState] = useState({
        pixabay: [],
        pexels: [],
        unsplash: [],
        limit: 2
    });
    const [extend, setExtend] = useState({
        style: false,
        textsize: false,
        changeBackground: true
    })

    useEffect(() => {
        const fetchImg = async () => {
            const pixabayimg = await axios.get(homepage.pixabay + homepage.pixabaykey + "&q=" + imgsearch);
            const pexelsimg = await axios.get(homepage.pexels + imgsearch, { headers: { Authorization: homepage.pexelskey } });
            const unsplashimg = await axios.get(homepage.unsplash, { headers: { Authorization: `Client-ID ${homepage.unsplashkey}` } });

            setState({ ...state, pixabay: pixabayimg.data.hits, pexels: pexelsimg.data.photos, unsplash: unsplashimg.data })
        }
        fetchImg()

    }, []);

    const fetchData = async (val, s) => {

        var pex = [];
        var uns = [];
        var unsplashdata = [];
        if (s) {
            setpages({
                ...pages, pixabay: 2, unsplash: 2, pexels: 2
            })
            setState({
                pixabay: [...state.pixabay = []],
                unsplash: [...state.unsplash = []],
                pexels: [...state.pexels = []]
            })
        }


        const pixa = await axios.get(homepage.pixabay + homepage.pixabaykey + "&q=" + imgsearch + "&page=" + pages.pixabay)

        if (imgsearch == "") {

            pex = await axios.get(homepage.pexels + "&page=" + pages.pexel, { headers: { Authorization: homepage.pexelskey } });

            uns = await axios.get(homepage.unsplash + "&page=" + pages.unsplash, { headers: { Authorization: `Client-ID ${homepage.unsplashkey}` } });

            unsplashdata = uns.data;

        } else {
            pex = await axios.get(homepage.pexelsearch + imgsearch + "&page=" + pages.pexel, {
                headers: { Authorization: homepage.pexelskey }
            })
            uns = await axios.get(homepage.unsplashsearch + imgsearch + "&page=" + pages.unsplash, { headers: { Authorization: `Client-ID ${homepage.unsplashkey}` } })

            unsplashdata = uns.data.photos.results;

        }

        setState({ ...state, pixabay: pixa.data.hits, pexels: pex.data.photos, unsplash: unsplashdata })
    };

    const fetchMore = async (val) => {
        if (val == 'pixabay') {
            var count = pages.pixabay + 1;
            setpages({
                ...pages, pixabay: count
            })
            const pixa = await axios.get(homepage.pixabay + homepage.pixabaykey + "&q=" + imgsearch + "&page=" + pages.pixabay)

            setState({ ...state, pixabay: state.pixabay.concat(pixa.data.hits) });
        } else if (val == 'pexel') {
            var count = pages.pexel + 1;
            setpages({
                ...pages, pexel: count
            })
            var pexe = await axios.get(homepage.pexelsearch + imgsearch + "&page=" + pages.pexel, {
                headers: { Authorization: homepage.pexelskey }
            })
            setState({ ...state, pexels: state.pexels.concat(pexe.data.photos) });
        } else if (val == 'unsplash') {
            var count = pages.unsplash + 1;
            setpages({
                ...pages, unsplash: count
            })
            var unsplash = await axios.get(homepage.unsplashsearch + imgsearch + "&page=" + pages.unsplash, { headers: { Authorization: `Client-ID ${homepage.unsplashkey}` } })
            // var unsplash = await axios.get(homepage.unsplashsearch + imgsearch.unsplash + "&page=" + pages.unsplash, { headers: { Authorization: `Client-ID ${homepage.unsplashkey}` } })
            setState({ ...state, unsplash: state.unsplash.concat(unsplash.data.photos.results) })

        }
    }

    return (
        <div className='rightbar'>
            <div>
                <h3 >Font Styles</h3>
            </div>

            <div >
                <FontPicker
                    apiKey="AIzaSyADd8xHi3CLD7VALC-GPeHi-DvH3yMPNTM"
                    activeFontFamily={styles.default}
                    onChange={(nextFont) => setstyles({ ...styles, default: nextFont.family })}
                />
            </div>

            <div >
                <div className='fontstyles'>
                    <div id='font-picker' style={{ width: '30%' }} className={extend.style ? 'expanded' : ''}>
                        <button type='button' className='dropdown-button' onClick={() => setExtend({ ...extend, style: !extend.style })}>
                            <p className='dropdown-font-family'>{styles.style}</p>
                            <p className='dropdown-icon finished'></p>
                        </button>
                        <ul className='font-list'>
                            <li className='font-list-item'>
                                <button type='button' value='Bold' onClick={(e) => setstyles({ ...styles, style: e.target.value })} className='font-button'>Bold</button>
                            </li>
                            <li className='font-list-item'>
                                <button type='button' value='Italic' onClick={(e) => setstyles({ ...styles, style: e.target.value })} className='font-button'>Italic</button>
                            </li>
                            <li className='font-list-item'>
                                <button type='button' value='Underline' onClick={(e) => setstyles({ ...styles, style: e.target.value })} className='font-button'>Underline</button>
                            </li>
                        </ul>
                    </div>
                    <button>T</button>
                    <button>T</button>
                    <button>T</button>
                    <div id='font-picker' style={{ width: '20%' }} className={extend.textsize ? 'expanded' : ''}>
                        <button type='button' className='dropdown-button' onClick={() => setExtend({ ...extend, textsize: !extend.textsize })}>
                            <p className='dropdown-font-family'>{styles.textsize}</p>
                            <p className='dropdown-icon finished'></p>
                        </button>
                        <ul className='font-list'>
                            <li className='font-list-item'>
                                <button type='button' onClick={(e) => setstyles({ ...styles, textsize: e.target.value })} value={'12'} className='font-button'>12</button>
                            </li>
                            <li className='font-list-item'>
                                <button type='button' onClick={(e) => setstyles({ ...styles, textsize: e.target.value })} value={'14'} className='font-button'>14</button>
                            </li>
                            <li className='font-list-item'>
                                <button type='button' onClick={(e) => setstyles({ ...styles, textsize: e.target.value })} value={'16'} className='font-button'>16</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div className='textstyles'>
                    <div className='btn-group'>
                        <button><FiAlignLeft /></button>
                        <button><FiAlignCenter /></button>
                        <button><FiAlignRight /></button>
                        <button><FiAlignJustify /></button>
                        <button><FiAlignLeft /></button>
                        <button><CgFormatLineHeight /></button>
                    </div>
                    <div className='btn-group'>
                        <button>AV</button>
                        <button>30</button>
                        <button><CgFormatLineHeight /></button>
                    </div>
                </div>
            </div>
            <div>
                <SketchPicker className='colorpicker' />
            </div>
            {
                show == 0 ?

                    < >
                        <div>
                            <div className='search'>
                                <Dropdown selectedValue={show} handleChange={(e) => setShow(e.target.value)} />
                                <input value={imgsearch} className='' placeholder='Search..' onChange={(e) => setImgsearch(e.target.value)}></input>
                                <button onClick={() => fetchData('pixabay', 's')} className='btn-primary'><AiOutlineSearch size='2x' /></button>
                            </div>

                        </div>
                        <div className='imageswidth'>
                            <Pixabay state={state} fetchData={(val) => fetchMore(val)} image={pixabay} />
                        </div>
                    </ >
                    :
                    show == 1 ?
                        < >
                            <div >
                                <div className='search'>
                                    <Dropdown selectedValue={show} handleChange={(e) => setShow(e.target.value)} />
                                    <input value={imgsearch} className='' placeholder='Search..' onChange={(e) => setImgsearch(e.target.value)}></input>
                                    <button onClick={() => fetchData('pexel', 's')} className='btn-primary'><AiOutlineSearch size='2x' /></button>
                                </div>
                            </div>
                            <div className='imageswidth'>
                                <Pexels state={state} fetchData={(val) => fetchMore(val)} image={pexel} />
                            </div>
                        </ >
                        :
                        < >
                            <div >
                                <div className='search'>
                                    <Dropdown selectedValue={show} handleChange={(e) => setShow(e.target.value)} />
                                    <input value={imgsearch} className='' placeholder='Search..' onChange={(e) => setImgsearch(e.target.value)}></input>
                                    <button onClick={() => fetchData('unsplash', 's')} className='btn-primary'><AiOutlineSearch size='2x' /></button>
                                </div>
                            </div>
                            <div className='imageswidth'>
                                <Unsplash state={state} fetchData={(val) => fetchMore(val)} image={uns} />
                            </div>
                        </ >
            }
        </div>
    )
}
export default Rightbar