import React from 'react';
import CartHeader from '@/components/ui/Header/CartHeader/CartHeader';
import Footer from '@/components/ui/Footer/Footer';

const EmptyLayout = ({ children }) => (
  <>
    <CartHeader />
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
