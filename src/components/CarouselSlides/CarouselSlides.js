import React, { useContext } from 'react';
import DBProductsContext from "@/db/products";

const CarouselSlides = ({carouselItem}) => {
    return (
        <div className="carousel-item active" data-id={carouselItem.id}>
            <img src={carouselItem.img} alt="ActiveSlide"/>
            <div className="container">
                <div className="carousel-caption">
                <h3 className="h1">{carouselItem.title}</h3>
                    <div>
                         <a className="btn" href="#" role="button">
                            View all DEALS
                            <img src="assets/icons/icon-angle-white.svg" className="ml-3" alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarouselSlides;