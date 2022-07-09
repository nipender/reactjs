import React from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from './../../assets/images/logo.png'

const Footer = () => {
     return (
          <div className="page-footer">
              <div className="container">
                    
                   <div className="row">
                        <div className="col-12 col-md-4">
                              <div className="footer-contact-touch">
                                   <h2>Let's stay in touch!</h2>
                                   <div className="contact-form">
                                        <form>
                                             <input type="text" className="form-control" placeholder="Your email" />
                                             <i className="fa fa-chevron-circle-right"></i>
                                        </form>
                                   </div>
                              </div>
                        </div>
                        <div className="col-12 col-md-4">
                              <div className="footer-widget">
                                   <h4>Product</h4>
                                   <ul>
                                        <li><Link to="/">iOS</Link></li>
                                        <li><Link to="/">Chrome</Link></li>
                                        <li><Link to="/">Android</Link></li>
                                   </ul>
                              </div>
                        </div>
                        <div className="col-12 col-md-4">
                              <div className="footer-widget">
                                   <h4>Resources</h4>
                                   <ul>
                                        <li><Link to="/">Terms & Condition</Link></li>
                                        <li><Link to="/">Privacy Policy</Link></li>
                                   </ul>
                              </div>
                        </div>
                   </div>
                   <div className="row">
                        <div className="col-12 col-md-4">
                              <div className="footer-contact-touch">
                                   <h4>Follow us</h4>
                                   <div className="social-links">
                                        <ul>
                                             <li><Link to={''}><i className="fa fa-instagram"></i></Link></li>
                                             <li><Link  to={''}><i className="fa fa-facebook"></i></Link></li>
                                             <li><Link  to={''}><i className="fa fa-twitter"></i></Link></li>
                                             <li><Link  to={''}><i className="fa fa-pinterest-p"></i></Link></li>
                                             <li><Link  to={''}><i className="fa fa-linkedin"></i></Link></li>
                                             <li><Link  to={''}><i className="fa fa-youtube-play"></i></Link></li>
                                        </ul>
                                        <p>Made with <i className="fa fa-heart"></i>around the <i className="fa fa-globe"></i></p>
                                        <p>© Speechify Inc. 2021</p>
                                   </div>
                              </div>
                        </div>
                        <div className="col-12 col-md-4">
                              <div className="footer-widget">
                                   <h4>Company</h4>
                                   <ul>
                                        <li><Link to="/">About us</Link></li>
                                        <li><Link to="/">Testimonials</Link></li>
                                        <li><Link to="/">Careers</Link></li>
                                   </ul>
                              </div>
                        </div>
                        <div className="col-12 col-md-4">
                              <div className="footer-widget">
                                   <h4>Support</h4>
                                   <ul>
                                        <li><Link to="/">Community</Link></li>
                                        <li><Link to="/">FAQ</Link></li>
                                        <li><Link to="/">Contact us</Link></li>
                                   </ul>
                              </div>
                        </div>
                   </div>
               </div> 
          </div>
     )
}

export default Footer
