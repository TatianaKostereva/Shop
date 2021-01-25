import React, { useEffect, useState } from 'react';
import Carousel from '@/components/ui/Carousel/Carousel';
import loadSlides from '@/services/loadSlides';
import EmptyLayoutWithMenu from '@/components/ui/Layout/EmptyLayoutWithMenu';

const MainEmptyLayout = ({ children }) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    loadSlides().then(setSlides);
  }, []);

  return (
    <EmptyLayoutWithMenu>
      <div className="col-lg-9 carousel">
        {slides && <Carousel slides={slides} />}
        {children}
      </div>
    </EmptyLayoutWithMenu>
  );
};

export default MainEmptyLayout;
