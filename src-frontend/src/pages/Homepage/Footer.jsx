import React from 'react'

const footer = () => {
  return (
    <>
      <div className="footer-section" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <div className="ftr_logo"><img src="https://ginee.ai/wp-content/uploads/2020/08/logo_icon.png" /> <img className="ftr_logo_txt" src="https://ginee.ai/wp-content/uploads/2020/08/logo_text.png" /></div>
            </div>
            <div className="col-sm-5">
              <div id="mc4wp_form_widget-2" class="skito-sidebar sidebar-right__widget widget_mc4wp_form_widget"><h3>Newsletter</h3>

                <form id="mc4wp-form-1" class="mc4wp-form mc4wp-form-61" method="post" data-id="61" data-name="Subscribe"><div class="mc4wp-form-fields">
                  <input type="email" name="EMAIL" placeholder="Your email address" required="" />
                  <input type="hidden" name="enquiry_type" value="Subscribe" />
                  <input type="submit" value="Sign up" class="footer-button" />
                </div>
                  <label style={{display: 'none'}}>Leave this field empty if you're human: <input type="text" name="_mc4wp_honeypot" value="" tabindex="-1" autocomplete="off" /></label><input type="hidden" name="_mc4wp_timestamp" value="1668112301"/><input type="hidden" name="_mc4wp_form_id" value="61" /><input type="hidden" name="_mc4wp_form_element_id" value="mc4wp-form-1" /><div class="mc4wp-response"></div></form></div>
            </div>
            <div className="col-sm-3 socials">
              <h3>Follow Us</h3>
              <ul className="footer-icon">
                <li><a href="https://www.linkedin.com/company/81818990/admin/" target="_blank" rel="noopener"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                <li><a href="https://www.instagram.com/ginee.ai/" target="_blank" rel="noopener"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                <li><a href="https://twitter.com/AiGinee" target="_blank" rel="noopener"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="https://www.facebook.com/Gineeai-112231060305258" target="_blank" rel="noopener"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="https://www.youtube.com/channel/UCgXB7rxAX7hTnugGmGZBAxg?view_as=subscriber" target="_blank" rel="noopener"><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="copyright_sec">
                <div className="copy">Copyright Ⓒ 2020 GINEE.</div>
                <div className="pba">Powered by AI</div>
                <div className="clr"></div>
              </div>

            </div>
            <div className="col-sm-8">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default footer