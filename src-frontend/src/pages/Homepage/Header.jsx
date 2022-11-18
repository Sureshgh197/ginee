import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col-sm-2 col-md-3"> <a href="https://ginee.ai/" class="logo">
            <div id="text-4" class="skito-sidebar sidebar-right__widget widget_text">
              <div class="textwidget">
                <p>
                  <img src="https://ginee.ai/wp-content/uploads/2020/08/logo_icon.png" style={{ marginRight: '5px' }} />
                  <img class="hdr_logo_txt" src="https://ginee.ai/wp-content/uploads/2020/08/logo_text.png" />
                </p>
              </div>
            </div>
          </a>
          </div>
          <div class="col-sm-9 col-md-8" >
            <input class="menu-btn" type="checkbox" id="menu-btn" />
            <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
            <div class="menu-primary-container"><ul id="menu-primary" class="menu"><li id="menu-item-15" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-15"><a href="#home">Home</a></li>
              <li id="menu-item-34" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-34"><a href="#solution">Solution</a></li>
              <li id="menu-item-35" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-35"><a href="#pricing">Pricing</a></li>
              <li id="menu-item-36" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-36"><a href="#contact">Contact</a></li>
              <li id="menu-item-36" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-36"><Link to='/login' >Sign in</Link></li>

            </ul>
            </div>
            
            <ul className="menu mobile">
                <li><a href="#">Home</a></li>
                <li><a href="#solution">Solution</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header