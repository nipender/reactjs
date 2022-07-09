import React from 'react'
import Footer from '../Footer';
import Header from '../Header';
import { useJwt } from "react-jwt";


const Layout = ({children}) => {

     const token = localStorage.getItem('token');
     const { decodedToken, isExpired } = useJwt(token);

     if(decodedToken){
          const { id , role } = decodedToken;
          return (
               <div className="page-wrapper">
                    <Header role={role} />
                         {children}
                    <Footer />
               </div>
          )

     }else{
          return (
               <div className="page-wrapper">
                    <Header role={2} />
                         {children}
                    <Footer />
               </div>
          )
     }

     
}

export default Layout;
