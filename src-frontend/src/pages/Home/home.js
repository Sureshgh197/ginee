import React, { useEffect, useState, useLayoutEffect, useRef, useCallback, createContext, useContext } from 'react';
import './home.scss';
import { FiPlus } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import Rightbar from './rightbar';
import Menu from './menu'
import { Header } from '../../components/Header/header.js'

//leftbar imports
import cursur from '../../assets/images/curser.svg'
import hand from '../../assets/images/hand.svg'
import slide from '../../assets/images/slides.svg'
import text from '../../assets/images/text.svg'
import gallary from '../../assets/images/gallery.svg'
import shapes from '../../assets/images/shapes.svg'
import search from '../../assets/images/search.svg'
import polygon from '../../assets/images/shapes/polygon.svg'
import rectangle from '../../assets/images/shapes/rectangle.svg'
import ellipse from '../../assets/images/shapes/ellipse.svg'
import diamond from '../../assets/images/shapes/diamond.svg'
import square from '../../assets/images/shapes/square.svg'
import spirites from '../../assets/images/spirites.png'
import { FaEraser } from 'react-icons/fa';

//canvas imports
import { fabric } from 'fabric';
import FileSaver from 'file-saver';

//rightbar imports
import FontPicker from "font-picker-react";
import { homepage } from '../../config/api'
import { FiAlignLeft, FiAlignCenter, FiAlignRight, FiAlignJustify } from 'react-icons/fi'
import { CgFormatLineHeight } from 'react-icons/cg'
import { AiOutlineSearch } from 'react-icons/ai'
import { Pixabay, Pexels, Unsplash, Dropdown, Fontsize } from '../../components';
import axios from 'axios';
import pixabay from '../../assets/images/pixabay.png'
import pexel from '../../assets/images/pexels.png'
import uns from '../../assets/images/unsplash.png'
import { SketchPicker } from 'react-color';


//===========language==================
import { workarea } from '../../config/lang/en.js'

const userContext = createContext();

export const Home = () => {


    const canvasContainer = useRef();
    const canvasRef = useRef();
    const fabricRef = useRef();
    const inputFileRef = useRef();


    const [extend, setExtend] = useState({
        style: false,
        textsize: false,
        changeBackground: true
    })
    const [menu, setMenu] = useState(0);
    const [tab, setTab] = useState(1);

    const [title, setTitle] = useState({
        activeTab: 1,
        tabs: [{
            id: 1,
            name: 'Untitled',
            tabcount: 1,
            tab: <Tabs show={extend.changeBackground} id={1} canvasRef={canvasRef} canvasContainer={canvasContainer} />,
            // tab: "",
        }],
        activeCanvasTab: 1,
        currentTab: { id: 1, name: "Untitled", tabcount: 1, tab: <Tabs show={extend.changeBackground} id={1} canvasRef={canvasRef} canvasContainer={canvasContainer} /> }
        // currentTab: { id: 1, name: "Untitled", tabcount: 1, tab: "" }
    })

    const [hover, setHover] = useState({
        menu: '0',
        submenu: '1'
    })


    //==============================
    //canvas states below
    //=================================

    const [width, height] = useWindowSize();
    const [element, setElement] = useState([]);
    const [upload, setUpload] = useState('')
    const [elementType, setelementType] = useState();
    const [canva, setCanvas] = useState([]);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [context, setContext] = useState(false)

    //===========================
    //rightbar states
    //============================

    const [show, setShow] = useState(0)
    const [cpicker, setCpicker] = useState(0)
    const [imgsearch, setImgsearch] = useState('');
    const [styles, setstyles] = useState({
        style: 'Bold',
        textsize: '10',
        default: 'Open Sans',
        text: 'Type here',
        // color: '#ffffff00',
        stroke: '#000',
        fill: '#ffffff00',
        fontWeight: false,
        fontStyle: false
    })

    // const [vinay, setVinay] = useState('')

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



    //======================
    // tab handling functions
    //=======================

    function handleImage() {
        setExtend({
            ...extend, changeBackground: !extend.changeBackground
        })
    }

    function handleNewtab(size) {
        console.log(size)
        var tab = document.querySelectorAll('h5[name="tabcount"]');
        var count = tab.length + 1;

        setTab(count)

        const newtab = { id: count, name: 'Untitled', tabcount: count, tab: <Tabs  show={extend.changeBackground} id={count} canvasRef={canvasRef} canvasContainer={canvasContainer} /> }
        // const newtab = { id: count, name: 'Untitled', tabcount: count, tab: "" }

        setTitle({
            ...title, tabs: [...title.tabs, newtab], currentTab: newtab, activeTab: count, activeCanvasTab: count
        });

        setTimeout(() => {
            loadCanvas(size)
        }, 100);
    }

    useEffect(() => { }, [tab])

    function selectedTab(tab) {
        setTab(tab.id);
        setTitle({ ...title, currentTab: tab, activeTab: tab.id })
    }

    function closeTab(tabtoDel) {
        const tabtoDelIndex = title.tabs.findIndex(tab => tab.id === tabtoDel.id);

        const updatedTabs = title.tabs.filter((tab, i) => {
            return i !== tabtoDelIndex
        });


        var i = 1;
        var newTab = [];
        updatedTabs.forEach((tab) => {
            tab = { id: i, name: 'Untitled', tabcount: i, tab: <Tabs show={extend.changeBackground} id={i} /> }
            // tab = { id: i, name: 'Untitled', tabcount: i, tab: "" }
            newTab.push(tab);
            i++;
        })

        const previousTab = title.tabs[tabtoDelIndex - 1] // || title.tabs[tabtoDelIndex + 1] || {};
        const previousorNext = previousTab

        setTitle({
            ...title,
            tabs: [...title.tabs = newTab],
            currentTab: previousorNext,
            activeTab: previousorNext.id
        })

    }

    function removeBackgroundTab() {

        setExtend({ ...extend, changeBackground: !extend.changeBackground })
    }

    function openTab(evt, cityName) {
        setHover({
            ...hover, menu: cityName
        })

    }

    function handleCanvas(val) {
        setMenu(i => !i);
        var tab = document.querySelectorAll('h5[name="tabcount"]');
        var count = tab.length + 1;

        // var width 

        const newtab = { id: count, name: 'Untitled', tabcount: count, tab: <Tabs show={extend.changeBackground} w={`${val.width}px`} h={`${val.height}px`} id={count} /> } //selected={tools}
        // const newtab = { id: count, name: 'Untitled', tabcount: count, tab: "" } //selected={tools}

        setTitle({
            ...title, tabs: [...title.tabs, newtab], currentTab: newtab, activeTab: count
        })
    }

    //===================================
    // rightbar functions
    //===================================

    useEffect(() => {
        const fetchImg = async () => {
            const pixabayimg = await axios.get(homepage.pixabay + homepage.pixabaykey + "&q=" + imgsearch);
            const pexelsimg = await axios.get(homepage.pexels + imgsearch, { headers: { Authorization: homepage.pexelskey } });
            const unsplashimg = await axios.get(homepage.unsplash, { headers: { Authorization: `Client-ID ${homepage.unsplashkey}` } });

            setState({ ...state, pixabay: pixabayimg.data.hits, pexels: pexelsimg.data.photos, unsplash: unsplashimg.data })
        }
        fetchImg();


    }, []);

    const fetchMore = async (val, s) => {
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
            if (imgsearch == "") {
                var pexe = await axios.get(homepage.pexels + "&page=" + pages.pexel, { headers: { Authorization: homepage.pexelskey } });
            } else {
                var pexe = await axios.get(homepage.pexelsearch + imgsearch + "&page=" + pages.pexel, {
                    headers: { Authorization: homepage.pexelskey }
                })
            }
            setState({ ...state, pexels: state.pexels.concat(pexe.data.photos) });

        } else if (val == 'unsplash') {
            var count = pages.unsplash + 1;
            setpages({
                ...pages, unsplash: count
            })
            if (imgsearch == "") {
                var unsplash = await axios.get(homepage.unsplash + "&page=" + pages.unsplash, { headers: { Authorization: `Client-ID ${homepage.unsplashkey}` } });
                var unsplashdata = unsplash.data;
            } else {
                var unsplash = await axios.get(homepage.unsplashsearch + imgsearch + "&page=" + pages.unsplash, { headers: { Authorization: `Client-ID ${homepage.unsplashkey}` } })
                var unsplashdata = unsplash.data.photos.results;
            }
            // var unsplash = await axios.get(homepage.unsplashsearch + imgsearch.unsplash + "&page=" + pages.unsplash, { headers: { Authorization: `Client-ID ${homepage.unsplashkey}` } })
            setState({ ...state, unsplash: state.unsplash.concat(unsplashdata) })

        }
    }


    //============================================
    //canvas functions below
    //========================================================

    useEffect(() => {
        initiateCanvas();
    }, []);

    function loadCanvas(size) {
        console.log('size',size)

        var count = document.getElementsByName('canvas').length;
        var canvas = new fabric.Canvas(`canvas${count}`, {
            // id:`canvas${count}`,
            id: count,
            width: canvasContainer.current.clientWidth,
            height: canvasContainer.current.clientHeight,
            selection: true, // disables drag-to-select
            // backgroundColor: 'lightGrey',
            preserveObjectStacking: true,
            excludeFromExport: true,
            fireRightClick: true,
            stopContextMenu: true,
        });

        fabric.util.loadImage(spirites, function (img) {
            const pattern = new fabric.Pattern({
                source: img,
                repeat: 'repeat'
            })

            let rect = new fabric.Rect({
                id: 'canvas',
                width: size.width,
                height: size.height,
                fill: pattern,
                selectable: false,
                excludeFromExport: false,
            });

            canvas.add(rect);

            rect.center();
            rect.setCoords();
        })

        var newcanvas = { canvas } 
        canva.push(newcanvas);
        
        return canvas
    }

    function initiateCanvas() {

        if (!canvasRef.current) return;
        if (fabricRef.current) return;

        var size = {};
        size.width = canvasContainer.current.clientWidth * 0.80
        size.height = canvasContainer.current.clientHeight * 0.85

        const canvas = loadCanvas(size);

        fabricRef.current = canvas;

        var inputw = 1000;
        var inputh = 1000;
        var canvasw = canvasContainer.current.clientWidth;
        var canvash = canvasContainer.current.clientHeight;

        // if (inputh > canvash) {

        // }

        // update the canvas viewport

        canvas.setActiveObject();
        canvas.on("mouse:down", (e) => contextMenu(e));

        document.addEventListener("contextmenu", contextMenu);
        return () => {
            document.removeEventListener("contextmenu", contextMenu);
        };
    }
    function zoomIn(e) {
        var canvas = new fabric.Canvas('canvas');
        var event = event || e
        console.log(event)
        var delta = event;
        var pointer = canvas.getPointer(event);
        var zoom = canvas.getZoom();
        zoom = zoom + delta / 200;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint({ x: event.offsetX, y: event.offsetY }, zoom);
        event.preventDefault();
        event.stopPropagation();
    }

    function handleChanges(i, val) {

        switch (i) {
            case 1:
                setstyles({ ...styles, default: val.family })
                canva.getActiveObject().set({
                    fontFamily: styles.default
                })
                canva.renderAll();
                break;
            case 2:
                setstyles({ ...styles, fill: val.hex })
                canva.getActiveObject().set({
                    fill: val.hex,
                    stroke: styles.stroke
                })
                canva.renderAll();
                break;
            case 3:
                setstyles({ ...styles, stroke: val.hex })
                canva.getActiveObject().set({
                    fill: styles.fill,
                    stroke: val.hex
                })
                canva.renderAll();
                break;
            case 4:
                setstyles({ ...styles, style: val.target.value });
                var value = val.target.value;

                var object = canva.getActiveObject();

                var type;
                if (object) {
                    type = object.get('type');
                }
                setExtend({ ...extend, style: !extend.style })
                switch (value) {
                    case 'bold':
                        var isBold = dtGetStyle(object, 'fontWeight') === 'bold';
                        dtSetStyle(object, 'fontWeight', isBold ? '' : 'bold');
                        break;

                    case 'italic':
                        var isItalic = dtGetStyle(object, 'fontStyle') === 'italic';
                        dtSetStyle(object, 'fontStyle', isItalic ? '' : 'italic');
                        break;

                    case 'underline':
                        var isUnderline = dtGetStyle(object, 'textDecoration') === 'underline';
                        dtSetStyle(object, 'textDecoration', isUnderline ? '' : 'underline');
                        object.dirty = true;
                        break;
                }
                break;

            case 5:
                setstyles({ ...styles, textsize: val.target.value })
                setExtend({ ...extend, textsize: !extend.textsize })
                canva.getActiveObject().set({
                    fontSize: val.target.value
                })
                canva.renderAll();
                break;
            case 6:
                canva.getActiveObject().set({
                    textAlign: 'left'
                })
                canva.renderAll();
                break;
            default:
                break;
        }

        function dtGetStyle(object, styleName) {
            return object[styleName];
        }

        // Set the style
        function dtSetStyle(object, styleName, value) {
            object[styleName] = value;
            object.set({ dirty: true });
            canva.renderAll();
        }

    }

    function deleteObject() {
        var doomedObj = canva.getActiveObject();
        if (doomedObj.type === 'activeSelection') {
            // active selection needs a reference to the canvas.
            doomedObj.canvas = canva;
            doomedObj.forEachObject(function (obj) {
                canva.remove(obj);
            });
        }//endif multiple objects
        else {
            //If single object, then delete it
            var activeObject = canva.getActiveObject();
            //How to delete multiple objects?
            //if(activeObject !== null && activeObject.type === 'rectangle') {
            if (activeObject !== null) {
                canva.remove(activeObject);
            }
        }//end else there's a single object
    }


    function handleCanvaImage(event) {
        var file = event.target.files;
        for (let i = 0; i < file.length; i++) {
            var reader = new FileReader();

            reader.onload = function (f) {
                var data = f.target.result;

                fabric.Image.fromURL(data, function (img) {
                    var oImg = img.set();
                    oImg.scaleToWidth(50);
                    oImg.scaleToHeight(50)
                    canva.add(oImg)
                    canva.renderAll();
                    canva.setActiveObject(oImg);

                    img.center();
                    img.setCoords();
                }, null, {
                    crossOrigin: 'anonymous'
                })
            };
            reader.readAsDataURL(file[i]);
        }

    };

    function handleClick(e) {
        var val = e.target.longDesc

        var activeCanvas = '';
        canva.filter((i) => {
            if(title.activeTab == i.canvas.id){
                activeCanvas = i.canvas
                console.log('a');
            } 
        })

        // console.log('width',width);
        // console.log('height',height);
        // console.log('canvasContainer.current.clientWidth',canvasContainer.current.clientWidth);
        // console.log('canvasContainer.current.clientHeight',canvasContainer.current.clientHeight);

        fabric.util.loadImage(val, function (img) {
            var object = new fabric.Image(img);
            var oImg = object.set();

            var ih = img.height;
            var iw = img.width;

            var cw = width * 80;
            var ch = height * 80;

            console.log('finalw',cw);
            console.log('finalh',ch);

            var width_ratio = cw / iw;
            var height_ratio = ch / ih;

            // if (width_ratio > height_ratio) {
            //    var fw = iw * width_ratio;
            //    var fh = ih * fw / iw;
            // } else {
            //    var fh = ih * height_ratio;
            //    var fw = iw * fh / ih;
            // }

            var finalw = iw * width_ratio / 100;
            var finalh = ih * height_ratio / 100;



            oImg.scaleToWidth(finalw);
            oImg.scaleToHeight(finalh);
            
            activeCanvas.add(oImg);

            oImg.center();
            oImg.setCoords();
            activeCanvas.setActiveObject(oImg);
            // canva.renderAll();

        }, null, {
            crossOrigin: 'anonymous'
        })

    }


    const uploadImage = () => {
        inputFileRef.current.click();
    }



    function addText(e) {
        let text = new fabric.Text(styles.text, {
            fill: '#000000',
            width: 450,
            fontFamily: 'Open Sans',
            fontSize: 16,
        });
        canva.add(text);
        canva.setActiveObject(text)

        text.enterEditing();
        text.selectAll();
        text.center();
        text.setCoords();
    }

    function addShapes(val) {
        switch (val) {
            case 'circle':
                var circle = new fabric.Circle({
                    left: 200,
                    top: 150,
                    radius: 30,
                    fill: styles.fill,
                    stroke: 2,
                    stroke: styles.stroke,
                    strokeWidth: 2
                });
                circle.hasRotatingPoint = true;
                canva.add(circle);
                canva.setActiveObject(circle)
                circle.center();
                circle.setCoords();
                break;

            case 'triangle':
                var triangle = new fabric.Triangle({
                    left: 130,
                    top: 150,
                    strokeWidth: 1,
                    width: 70,
                    height: 60,
                    fill: styles.fill,
                    selectable: true,
                    originX: 'center',
                    stroke: styles.stroke,
                    strokeWidth: 2
                });
                triangle.hasRotatingPoint = true;
                canva.add(triangle)
                canva.setActiveObject(triangle)
                break;
            case 'rectangle':
                var rec = new fabric.Rect({
                    top: 10,
                    left: 10,
                    width: 75,
                    height: 100,
                    fill: styles.fill,
                    stroke: styles.stroke,
                    strokeWidth: 2
                });

                rec.hasRotatingPoint = true;
                canva.setActiveObject(rec)
                canva.add(rec)
                break;
            case 'ellipse':
                var ellipse = new fabric.Ellipse({
                    top: 150,
                    left: 10,
                    /* Try same values rx, ry => circle */
                    rx: 75,
                    ry: 50,
                    // fill: '',
                    fill: styles.fill,
                    stroke: styles.stroke,
                    strokeWidth: 2
                });
                ellipse.hasRotatingPoint = true;
                canva.setActiveObject(ellipse)
                canva.add(ellipse)
                break;
            case 'star':
                var star = new fabric.Polygon(
                    [{ x: 350, y: 75 },
                    { x: 380, y: 160 },
                    { x: 470, y: 160 },
                    { x: 400, y: 215 },
                    { x: 423, y: 301 },
                    { x: 350, y: 250 },
                    { x: 277, y: 301 },
                    { x: 303, y: 215 },
                    { x: 231, y: 161 },
                    { x: 321, y: 161 },], {
                    top: 180,
                    left: 200,
                    fill: styles.fill,
                    stroke: styles.stroke,
                    strokeWidth: 2
                });
                star.hasRotatingPoint = true;
                canva.setActiveObject(star)
                canva.add(star)
                break;
            case 'square':
                var square = new fabric.Rect({
                    width: 100,
                    height: 100,
                    fill: styles.fill,
                    stroke: styles.stroke,
                    strokeWidth: 2
                });
                canva.add(square);
                canva.setActiveObject(square)
                break;
            default:
                break;
        }

        //custom made stars
        var points = starPolygonPoints(5, 50, 20);

        var myStar = new fabric.Polygon(points, {
            // stroke: 'red',
            left: 100,
            top: 10,
            strokeWidth: 2,
            strokeLineJoin: '',
            angle: 10
        }, true);

        function starPolygonPoints(spikeCount, outerRadius, innerRadius) {
            var rot = Math.PI / 2 * 3;
            var cx = outerRadius;
            var cy = outerRadius;
            var sweep = Math.PI / spikeCount;
            var points = [];
            var angle = 0;

            for (var i = 0; i < spikeCount; i++) {
                var x = cx + Math.cos(angle) * outerRadius;
                var y = cy + Math.sin(angle) * outerRadius;
                points.push({ x: x, y: y });
                angle += sweep;

                x = cx + Math.cos(angle) * innerRadius;
                y = cy + Math.sin(angle) * innerRadius;
                points.push({ x: x, y: y });
                angle += sweep
            }
            return (points);
        }

    }

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([(window.innerWidth * 0.74302), (window.innerHeight * 0.84382)]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    function onDragEnter(event) {
        var event = event
        event.dataTransfer.setData('data', event.target);
        var val = event.target
        // setVinay('asdsdasdas');

    }

    function onDragLeave(e) {
    }



    function onDragOver(event) {


        var cc = event.dataTransfer.getData('data');
    }

    function onDrop(event) {
        var mm = event.target;

        return false;
    }

    function uploadLocal(e) {

    }



    // send objects to front or back functions

    function bringfront() {
        canva.getActiveObject().bringToFront();
        canva.renderAll();
    }

    function sendBackwards() {
        canva.getActiveObject().sendBackwards()
        canva.renderAll();
    }

    function sendToBack() {
        canva.getActiveObject().sendToBack();
        canva.renderAll();
    }

    function bringForward() {
        canva.getActiveObject().bringForward();
        canva.renderAll();
    }

    function exportImage(i, name) {

        var activeCanvas = '';
        canva.filter((i) => {
            if(title.activeTab == i.canvas.id){
                activeCanvas = i.canvas
                console.log('a');
            } 
        })

        activeCanvas.getObjects().forEach((i) => {
            var canvas = ''
            if (i.id == 'canvas') {
                canvas = i
                canvas.set({
                    fill: ""
                })
            }
        })

        var left = canvasContainer.current.clientWidth * 0.20
        var top = canvasContainer.current.clientHeight * 0.15

        const dataURL = activeCanvas.toDataURL({
            width: canvasContainer.current.clientWidth * 0.80,
            height: canvasContainer.current.clientHeight * 0.85,
            left: left / 2,
            top: top / 2,
            format: i,
        });

        const link = document.createElement('a');
        link.download = `image.${i}`;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMenu(false)
    }


    async function saveImage() {
        await axios.post('http://127.0.0.1:8000/saveimage/', {
            "height": "10",
            "text": "Something",
            "image": {
                "url": "https://cdn.pixabay.com/photo/2022/09/26/17/02/storm-7481103_150.jpg"
            },
            "title": "Image"
        }).then((res) => {
            console.log(res)
        })
    }

    function handleScroll(e) {

    }

    const contextMenu = useCallback(
        (e) => {
            if (e.button === 3) {
                setAnchorPoint({ x: e.e.pageX, y: e.e.pageY });
                setContext(i => !i)
            }
            // setContext(false)

        },
        [setAnchorPoint, setContext],
    )

    //=========================
    // Menu function
    //================

    function handleHover(val) {
        if (menu != 0) {
            setMenu(val)
        }
    }

    return (
        <userContext.Provider value={tab }>
            <React.Fragment>
                <Header />
                <div className='design_home'>
                    <div className='design_menu'>
                        <h6 onClick={() => menu != 1 ? setMenu(1) : setMenu(0)} onMouseEnter={() => handleHover(1)} onMouseLeave={() => setMenu(0)} className={menu == 1 ? 'bg' : ""} >{workarea.menu.file}</h6>
                        <h6 onClick={() => menu != 2 ? setMenu(2) : setMenu(0)} onMouseEnter={() => handleHover(2)} onMouseLeave={() => setMenu(0)} className={menu == 2 ? 'bg' : ""}>{workarea.menu.edit}</h6>
                        <h6 onClick={() => menu != 3 ? setMenu(3) : setMenu(0)} onMouseEnter={() => handleHover(3)} onMouseLeave={() => setMenu(0)} className={menu == 3 ? 'bg' : ""}>{workarea.menu.window}</h6>
                        <h6>{workarea.menu.about}</h6>&nbsp;&nbsp;
                    </div>

                    <div className='center'>
                        <Menu menu={menu}
                            handleCanvas={(val) => handleCanvas(val)} tabname={title}
                            handleClose={(val) => closeTab(val)}
                            saveImage={(i, val) => exportImage(i, val)}
                            setMenu={(val) => setMenu(val)}
                            handleNewtab={(val) => handleNewtab(val)}
                        />
                        <div className='untitled'>
                            {
                                title.tabs.map((i, index) => {
                                    return <>
                                        <h5 key={index}
                                            id={index} name='tabcount'
                                            onClick={() => selectedTab(i)}
                                            className={i.id === title.activeTab ? 'tabindex active' : 'tabindex'}
                                            onDoubleClick={() => alert('doubleclicked')}>{i.name} - {i.tabcount} &nbsp; <AiOutlineClose onClick={() => closeTab(i)} /></h5>
                                    </>
                                })
                            }
                            <FiPlus onClick={(e) => handleNewtab(e)} />
                        </div>
                        <div style={{ height: '95%' }}>
                            {
                                title.tabs.map((i, index) => {
                                    return <React.Fragment >
                                        {i.tab}
                                    </React.Fragment>
                                })
                            }
                        </div>

                        {/* <div ref={canvasContainer} onScroll={(e) => handleScroll(e)} className={title.activeTab == title.currentTab.id ? 'canvasscreen active' : 'canvasscreen'}>
                        <canvas id="canvas" ref={canvasRef} />
                    </div> */}
                        {/* <Tabs canvasRef={canvasRef} canvasContainer={canvasContainer}/>  */}
                        {
                            context ? (
                                <div
                                    className="context"
                                    style={{
                                        top: anchorPoint.y,
                                        left: anchorPoint.x
                                    }}
                                >
                                    <h5 onClick={() => bringForward()}>{workarea.contextmenu.bring_forward}</h5>
                                    <h5 onClick={() => bringfront()} >{workarea.contextmenu.bring_to_front}</h5>
                                    <h5 onClick={() => sendBackwards()}>{workarea.contextmenu.send_backwards}</h5>
                                    <h5 onClick={() => sendToBack()}>{workarea.contextmenu.send_to_last}</h5>
                                </div>
                            ) : (
                                <> </>
                            )
                        }
                    </div>

                    <div className='rightbar'>
                        <div>
                            <h3 >{workarea.rightbar.font_style}</h3>
                        </div>

                        <div >
                            <FontPicker
                                apiKey="AIzaSyADd8xHi3CLD7VALC-GPeHi-DvH3yMPNTM"
                                activeFontFamily={styles.default}
                                onChange={(font) => handleChanges(1, font)}
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
                                            <button type='button' value='bold' onClick={(e) => handleChanges(4, e)} className='font-button'>Bold</button>
                                        </li>
                                        <li className='font-list-item'>
                                            <button type='button' value='italic' onClick={(e) => handleChanges(4, e)} className='font-button'>Italic</button>
                                        </li>
                                        <li className='font-list-item'>
                                            <button type='button' value='underline' onClick={(e) => handleChanges(4, e)} className='font-button'>Underline</button>
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
                                        {
                                            Fontsize.map((i) => {
                                                return <li className='font-list-item' key={i.id}>
                                                    <button type='button' onClick={(e) => handleChanges(5, e)} value={i.fontsize} className='font-button'>{i.fontsize}</button>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='textstyles'>
                                <div className='btn-group'>
                                    <button><FiAlignLeft onClick={() => handleChanges(6)} /></button>
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
                            <div className="tab">
                                <h5 className={cpicker == 0 ? 'active' : ''} onClick={() => setCpicker(0)}>Fill</h5>
                                <h5 className={cpicker == 1 ? 'active' : ''} onClick={() => setCpicker(1)}>Stroke</h5>
                            </div>
                        </div>
                        {
                            cpicker == 0 ?
                                <div>
                                    <SketchPicker className='colorpicker'
                                        color={styles.fill}
                                        onChange={(colour) => handleChanges(2, colour)}

                                    />
                                </div> :
                                <div>
                                    <SketchPicker className='colorpicker'
                                        color={styles.stroke}
                                        onChange={(colour) => handleChanges(3, colour)}

                                    />
                                </div>
                        }
                        {
                            show == 0 ?

                                < >
                                    <div>
                                        <div className='search'>
                                            <Dropdown selectedValue={show} handleChange={(e) => setShow(e.target.value)} />
                                            <input value={imgsearch}
                                                className='' placeholder='Search..'
                                                onKeyPress={(e) => e.key === 'Enter' || e.keyCode === 13 ? fetchMore('pixabay', 's') : ''}
                                                onChange={(e) => setImgsearch(e.target.value)}
                                            ></input>
                                            <button onClick={() => fetchMore('pixabay', 's')} className='btn-primary'><AiOutlineSearch /></button>
                                        </div>

                                    </div>
                                    <div className='imageswidth'>
                                        <Pixabay state={state} fetchData={(val) => fetchMore(val)}
                                            image={pixabay} handleClick={(e) => handleClick(e)}
                                        />
                                    </div>
                                </ >
                                :
                                show == 1 ?
                                    < >
                                        <div >
                                            <div className='search'>
                                                <Dropdown selectedValue={show} handleChange={(e) => setShow(e.target.value)} />
                                                <input value={imgsearch} className=''
                                                    placeholder='Search..'
                                                    onKeyPress={(e) => e.key === 'Enter' || e.keyCode === 13 ? fetchMore('pexel', 's') : ''}
                                                    onChange={(e) => setImgsearch(e.target.value)}></input>
                                                <button onClick={() => fetchMore('pexel', 's')} className='btn-primary'><AiOutlineSearch /></button>
                                            </div>
                                        </div>
                                        <div className='imageswidth'>
                                            <Pexels state={state} fetchData={(val) => fetchMore(val)} handleClick={(e) => handleClick(e)} image={pexel} />
                                        </div>
                                    </ >
                                    :
                                    < >
                                        <div >
                                            <div className='search'>
                                                <Dropdown selectedValue={show} handleChange={(e) => setShow(e.target.value)} />
                                                <input value={imgsearch}
                                                    className='' placeholder='Search..'
                                                    onKeyPress={(e) => e.key === 'Enter' || e.keyCode === 13 ? fetchMore('unsplash', 's') : ''}
                                                    onChange={(e) => setImgsearch(e.target.value)}></input>
                                                <button onClick={() => fetchMore('unsplash', 's')} className='btn-primary'><AiOutlineSearch /></button>
                                            </div>
                                        </div>
                                        <div className='imageswidth'>
                                            <Unsplash state={state} fetchData={(val) => fetchMore(val)} handleClick={(e) => handleClick(e)} image={uns} />
                                        </div>
                                    </ >
                        }
                    </div>
                </div>
                <React.Fragment>
                    <div className='vertical'>
                        <div>
                            <img src={cursur} className='subapp' />
                            <img src={hand} className='subapp' />
                            <img src={slide} className='subapp' />
                            <img src={text} onClick={() => addText()} className='subapp' />
                            <img src={shapes} className='subapp' onClick={() => upload == 1 ? setUpload('0') : setUpload('1')} />
                            <div className='imagedrop' onMouseLeave={() => setUpload('0')} style={upload == '1' ? { display: 'block', width: 'auto', } : { display: 'none' }}  >
                                <div>
                                    <img src={square} onClick={() => addShapes('square')} />
                                    <h6>Square</h6>
                                </div>
                                <div>
                                    <img src={ellipse} onClick={() => addShapes('circle')} />
                                    <h6>Circle</h6>
                                </div>
                                <div>
                                    <img src={rectangle} onClick={() => addShapes('rectangle')} />
                                    <h6>Rectangle</h6>
                                </div>
                                <div>
                                    <img src={diamond} onClick={() => addShapes('star')} />
                                    <h6>Star</h6>
                                </div>
                                <div>
                                    <img src={polygon} onClick={() => addShapes('triangle')} />
                                    <h6>Triangle</h6>
                                </div>
                            </div>
                            <img src={gallary} className='subapp' onClick={(e) => uploadImage(e)} />
                            <img src={search} className='subapp' />
                            <FaEraser color='white' onClick={() => deleteObject()} />
                            <input ref={inputFileRef} style={{ display: 'none' }}
                                onChange={(e) => handleCanvaImage(e)} type='file' multiple />
                        </div>
                    </div>
                </React.Fragment>
            </React.Fragment>
        </userContext.Provider>
    )
}


// const Tabs = ""

const Tabs = ({ id, canvasRef, canvasContainer }) => {
const tab = useContext(userContext);
    return (
        <React.Fragment >
            <div ref={canvasContainer} className={tab == id ? 'canvasscreen active block' : 'canvasscreen active none'} >   {/*  className='canvasscreen active' */}
                <canvas id={`canvas${id}`} name='canvas' ref={canvasRef} />
            </div>
        </React.Fragment >
    )
}

export default Home
