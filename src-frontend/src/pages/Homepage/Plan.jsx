import React from 'react'

function Plan() {
  return (
    <div className="how-much" id="pricing">
      <div className="container">
        <div className="row">
          <h2>PICK YOUR PLAN</h2>
          <p>Our ecocosm of Apps enables people and teams get everything and more done all in one go.</p>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {/* <div className="col-sm-2"></div> */}
            <div className="col-sm-4">
              <div className="how-box">
                <h3>Professional Use</h3>
                <h4><span>$</span> 99</h4>
                <button id="myBtn" className="box-button">TRY FOR FREE</button>

              </div>
            </div>
            <div className="col-sm-4">
              <div className="how-box">
                <h3>Enterprise Use</h3>
                <h5>CUSTOMIZE<br />
                  YOUR<br />
                  WISH</h5>
                <a href="#" className="box-button">CONTACT EXPERT !</a>

              </div>
            </div>
          </div>
          {/* <div className="col-sm-2"></div> */}
        </div>
      </div>
    </div>
  )
}

export default Plan