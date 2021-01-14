import React from 'react';
import Footer from '@/components/ui/Footer/Footer';
import MainHeader from '@/components/ui/Header/MainHeader/MainHeader';

const EmptyLayout = ({ children }) => (
  <>
    <MainHeader />
    <main role="main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {children}
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default EmptyLayout;
