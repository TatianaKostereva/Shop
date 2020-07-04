import React, {useContext} from 'react'
import MainHeader from '@/components/Header/MainHeader';
import Footer from '@/components/Footer/Footer';
import Menu from './lib/Menu';
import Carousel from "@/lib/Carousel";
import DBProductsContext from "@/db/products";
import loadProduct from "@/lib/loadProduct";
import ReactDOM from "react-dom";
import ProductList from "@/lib/ProductList";

loadProduct('/assets/data/products.json').then((productsData) => {
<ProductList productsData = {productsData} />
});

const MainEmptyLayout = () => {
 const arr = useContext(DBProductsContext);

 return (
   <>
   <MainHeader/>
   <main role="main">
    <div className="backdrop"></div>
     <div className="container">
      <div className="row flex-column-reverse flex-lg-row">
       <div className="col-lg-3 main-menu">
         <Menu />
       </div>
       <div className="col-lg-9 carousel">
         <Carousel slides={arr} />,
       </div>
      </div>
     </div>
     <div id="root" className="container product-list">
       <ProductList productsData = {productsData} />
     </div>
    </main>
   <Footer/>
   </>
 )
};

export default MainEmptyLayout;