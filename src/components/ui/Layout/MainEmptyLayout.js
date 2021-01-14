import React, { useEffect, useState } from 'react';
import Carousel from '@/components/ui/Carousel/Carousel';
import loadSlides from '@/services/loadSlides';
import EmptyLayoutWithMenu from '@/components/ui/Layout/EmptyLayoutWithMenu';

const MainEmptyLayout = ({ children, }) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    loadSlides().then(setSlides);
  }, []);

  return (
    <EmptyLayoutWithMenu>
      {slides && <Carousel slides={slides} />}
      {children}
    </EmptyLayoutWithMenu>
  );
};

export default MainEmptyLayout;
