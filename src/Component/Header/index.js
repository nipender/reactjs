import React from 'react';
import { Link , useHistory  } from 'react-router-dom';
import { Button } from 'reactstrap';
import BrandLogo from './../../assets/images/logo.png';

const Header = (props) => {

     let history = useHistory();
     let token = localStorage.getItem('token');

     const handleLogout = () => {
          localStorage.removeItem("token");
          return history.push("/login");
     };

     console.log("props",props);

     return (
          <div className="page-header">
               <div className="container">
                    <div className="row">
                         <div className="col-12 col-md-6">
                              <div className="brand-logo">                                   
                                   <Link to={'/'}><img src={BrandLogo} alt="Speechify logo"/></Link>
                              </div>
                         </div>
                         <div className="col-12 col-md-6">
                              <div className="menuwrap">
                                   <div className="header-menu">
                                        <ul className="main-menu">
                                             {token && token !== null ?
                                             <>
                                                  {props.role == 2 ?
                                                  <>
                                                    <li><Link to={'/add-book'}>Add New Book</Link></li>
                                                    <li><Link to={'/import-books'}>Import Book</Link></li>
                                                    <li><Link to={'/courses-list'}>Book List</Link></li>
                                                    <li><button className="logout-link" onClick={() => handleLogout()} >Logout</button></li>
                                                  </>
                                                  :  
                                                  <>                                                    
                                                    <li><Link to={'/admin/dashboard'}>Dashboard</Link></li> 
                                                    <li><Link to={'/admin/courses-list'}>Book List</Link></li>
                                                    <li><Link to={'/admin/users-list'}>User List</Link></li>
                                                    <li><button className="logout-link" onClick={() => handleLogout()} >Logout</button></li>  
                                                  </>                                                 
                                                  }                                                  
                                             </>  
                                             :
                                                  <>
                                                  {props.role == 2 ?
                                                  <>
                                                    <li><Link to={'/login'}>Login</Link></li>
                                                    <li><Link to={'/register'}>Register</Link></li>
                                                  </>
                                                  :                                                      
                                                    <li><Link to={'/admin/login'}>Login</Link></li>                                                  
                                                  } 
                                                  </> 
                                             }                                      
                                        </ul>
                                   </div>                              
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Header
