import React, {useContext, useState} from 'react'
import MainHeader from '@/components/Header/MainHeader';
import Footer from '@/components/Footer/Footer';
import Menu from '@/lib/Menu';
import Carousel from "@/lib/Carousel";
import DBProductsContext from "@/db/products";
import ProductList from "@/lib/ProductList";

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
                title: 'Accessories'
            }
        ]
    },
    {
        id: 'cinema',
        title: 'Home Cinema, TV & Video',
        children: [
            {
                id: 'Audio',
                title: 'Audio'
            },
            {
                id: 'Video',
                title: 'Video'
            }
        ]
    },
];

const MainEmptyLayout = () => {
 const productsData = useContext(DBProductsContext);
 const [showBackDrop, setShowBackDrop] = useState();
 const backDropClassName = `backdrop ${showBackDrop && 'show'}`

 return (
   <>
   <MainHeader/>
   <main role="main">
    <div className={backDropClassName} />
     <div className="container">
      <div className="row flex-column-reverse flex-lg-row">
       <div className="col-lg-3 main-menu">
         <Menu menu={menu} setShowBackDrop={setShowBackDrop}/>
       </div>
       <div className="col-lg-9 carousel">
         <Carousel slides={slides} />
       </div>
      </div>
     </div>
     <div id="root" className="container product-list">
       <ProductList productsData={productsData} />
     </div>
    </main>
   <Footer/>
   </>
 )
};

export default MainEmptyLayout;