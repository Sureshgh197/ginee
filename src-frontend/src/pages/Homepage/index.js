import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Heroslider from './Heroslider.jsx'
import Investor from './Investor.jsx'
import Plan from './Plan.jsx'
import Subscription from './Subscription.jsx'
import Team from './Team.jsx'
import Whoisginee from './Whoisginee.jsx'
import '../../assets/css/style.css';
import '../../assets/css/carousel.css';
// import './assets/css/responsive.css';
import '../../assets/css/responsive.css';

const Homepage = () => {
    return (
        <>
            <Header />
            <Heroslider />
            <Whoisginee />
            <Subscription />
            <Plan />
            <Investor />
            <Team />
            <Footer /></>
    )
}

export default Homepage