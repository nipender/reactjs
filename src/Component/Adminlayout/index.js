import React from 'react'
import Footer from '../Footer'
import Header from '../Header'


const Adminlayout = ({children}) => {
     return (
          <div className="page-wrapper">
               <Header role={1} />
                    {children}
               <Footer />
          </div>
     )
}

export default Adminlayout
