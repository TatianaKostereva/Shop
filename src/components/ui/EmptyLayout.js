import React from 'react'
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const EmptyLayout = ({ children }) => {
  return (
    <>
      <Header/>
      <main role="main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
};

export default EmptyLayout;
