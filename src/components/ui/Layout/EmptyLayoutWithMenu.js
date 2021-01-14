import React, { useEffect, useState } from 'react';
import Menu from '@/components/ui/Menu/Menu';
import loadMenu from '@/services/loadMenu';
import EmptyLayout from '@/components/ui/Layout/EmptyLayout';

const EmptyLayoutWithMenu = ({ children }) => {
  const [showBackDrop, setShowBackDrop] = useState(false);
  const backDropClassName = `backdrop ${showBackDrop && 'show'}`;
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    loadMenu().then(setMenu);
  }, []);

  return (
    <EmptyLayout>
      <div className={backDropClassName} />
      <div className="col-lg-3 main-menu">
        {menu && <Menu menu={menu} setShowBackDrop={setShowBackDrop} />}
      </div>
      <div className="col-lg-9 carousel">
        {children}
      </div>
    </EmptyLayout>
  )

}


export default EmptyLayoutWithMenu;
