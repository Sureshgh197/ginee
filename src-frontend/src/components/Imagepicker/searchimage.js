import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
// import useStateWithCallback from 'use-state-with-callback';
// import Post from "./Post";
import { homepage } from '../../config/api'
import pixabay from '../../assets/images/pixabay.png'

export const Pixabay = ({ state, fetchData, image, handleClick }) => {

    return (
        <InfiniteScroll
            dataLength={state.pixabay.length}
            next={() => fetchData('pixabay')}
            hasMore={true}
            loader={<img className="logos" src={image} ></img>}
            height={400}
            className='imagepicker'
        >
            <ul className="">
                <div className='images'>
                    {state.pixabay.map((images) => (

                        <div key={images.id} className="pixabay" >
                            <img id={images.id} src={images.previewURL}
                                longdesc={images.largeImageURL}
                                crossOrigin="true"
                                draggable
                                onClick={(e) => handleClick(e)}
                            />
                        </div>
                    ))
                    }
                </div>
            </ul>
        </InfiniteScroll>
    );
}

export const Pexels = ({ state, fetchData, image,handleClick }) => {

    return (
        <InfiniteScroll
            dataLength={state.pexels.length}
            next={() => fetchData('pexel')}
            hasMore={true}
            loader={<img className="logos" src={image} ></img>}
            height={400}
            className='imagepicker'
        >
            <ul className="">
                <div className='images'>
                    {
                        state.pexels == "" ? "" :
                            state.pexels.map((i) => {
                                return <div key={i.id} className="pixabay" >
                                    <img src={i.src.small}
                                        longdesc={i.src.original}
                                        crossOrigin="true"
                                        onClick={(e) => handleClick(e)}

                                    />
                                </div>
                            })
                    }
                </div>
            </ul>
        </InfiniteScroll>
    );
}
export const Unsplash = ({ state, fetchData, image, dragStart,handleClick }) => {


    return (
        <InfiniteScroll
            dataLength={state.unsplash.length}
            next={() => fetchData('unsplash')}
            hasMore={true}
            loader={<img className="logos" src={image} ></img>}
            height={400}
            className='imagepicker'
        >
            <ul className="">
                <div className='images'>
                    {
                        state.unsplash == "" ? <img className="logos" src={image} ></img> :
                            state.unsplash.map((i) => {
                                return <div key={i.id} onDragStart={() => dragStart()} className="pixabay"  >
                                    <img src={i.urls.thumb} draggable
                                        longdesc={i.urls.regular}
                                        crossOrigin="true"
                                        onClick={(e) => handleClick(e)}

                                    />
                                </div>
                            })
                    }
                </div>
            </ul>
        </InfiniteScroll>
    );
}




// class App extends React.Component {
// //   state = {
// //     items: Array.from({ length: 20 }),
// //     hasMore: true
// //   };

//   fetchMoreData = () => {
//     if (this.state.items.length >= 500) {
//       this.setState({ hasMore: false });
//       return;
//     }
//     // a fake async api call like which sends
//     // 20 more records in .5 secs
//     setTimeout(() => {
//       this.setState({
//         items: this.state.items.concat(Array.from({ length: 20 }))
//       });
//     }, 500);
//   };

//   render() {
//     return (
//       <div>
//         <h1>demo: react-infinite-scroll-component</h1>
//         <hr />
//         <InfiniteScroll
//           dataLength={this.state.items.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.hasMore}
//           loader={<h4>Loading...</h4>}
//           height={400}
//           endMessage={
//             <p style={{ textAlign: "center" }}>
//               <b>Yay! You have seen it all</b>
//             </p>
//           }
//         >
//           {this.state.items.map((i, index) => (
//             <div style={style} key={index}>
//               div - #{index}
//             </div>
//           ))}
//         </InfiniteScroll>
//       </div>
//     );
//   }
// }

