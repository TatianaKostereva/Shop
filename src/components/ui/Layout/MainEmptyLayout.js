import React, { useContext, useState } from 'react';
import MainHeader from '@/components/ui/Header/MainHeader';
import Footer from '@/components/ui/Footer/Footer';
import Menu from '@/components/ui/Menu/Menu';
import Carousel from '@/components/ui/Carousel/Carousel';

const slides = [
  {
    id: 0,
    title: 'BEST LAPTOP DEALS',
    img: './assets/images/default-slide-img.jpg',
  },
  {
    id: 1,
    title: 'BEST HEADPHONES DEALS',
    img: './assets/images/default-slide-img.jpg',
  },
  {
    id: 2,
    title: 'BEST SPEAKERS DEALS',
    img: './assets/images/default-slide-img.jpg',
  },
];

const menu = [
  {
    id: 'cameraPhotos',
    title: 'Camera & Photo',
    children: [
      {
        id: 'Accessories',
        title: 'Accessories',
      },
    ],
  },
  {
    id: 'cinema',
    title: 'Home Cinema, TV & Video',
    children: [
      {
        id: 'Audio',
        title: 'Audio',
      },
      {
        id: 'Video',
        title: 'Video',
      },
    ],
  },
];

const MainEmptyLayout = ({ children }) => {
  const [showBackDrop, setShowBackDrop] = useState();
  const backDropClassName = `backdrop ${showBackDrop && 'show'}`;

  return (
    <>
      <MainHeader />
      <main role="main">
        <div className={backDropClassName} />
        <div className="container">
          <div className="row flex-column-reverse flex-lg-row">
            <div className="col-lg-3 main-menu">
              <Menu menu={menu} setShowBackDrop={setShowBackDrop} />
            </div>
            <div className="col-lg-9 carousel">
              <Carousel slides={slides} />
            </div>
          </div>
        </div>
        <div id="root" className="container product-list">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainEmptyLayout;
