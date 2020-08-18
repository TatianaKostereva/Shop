import React from 'react';
import useMenu from '@/components/ui/Menu/hooks/useMenu';

const Menu = ({ menu }, { setShowBackDrop }) => {
  const {
    showDropdownMenu,
    hideDropdownMenu,
    currentItem,
  } = useMenu({ setShowBackDrop });

  return (
    <ul className="list-group sidebar">
      {menu.map((item) => {
        const className = `dropdown-menu ${(item.menuId === currentItem) && 'show'}`;
        return (
          <li className="list-group-item dropdown" data-menu-to={item.menuId} key={item.menuId} onPointerEnter={showDropdownMenu} onPointerLeave={hideDropdownMenu}>
            <a className="nav-link dropdown-toggle" id="cameraPhotos">{item.menuTitle}</a>

            <ul className={className}>
              {JSON.parse(item.childId).map((data) => (
                <li data-id={data} key={data} className="dropdown-item"><a>{data}</a></li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
