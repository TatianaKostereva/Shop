import React from 'react';
import useMenu from '@/components/ui/Menu/hooks/useMenu';

const Menu = ({ menu, setShowBackDrop }) => {
  const {
    showDropdownMenu,
    hideDropdownMenu,
    currentItem,
  } = useMenu({ setShowBackDrop });

  const roots = menu.filter((item) => !item.parentId);

  return (
    <ul className="list-group sidebar">
      {roots.map((item) => {
        const className = `dropdown-menu ${(item.menu_id === currentItem) && 'show'}`;
        return (
          <li className="list-group-item dropdown" data-menu-to={item.menu_id} key={item.menu_id} onPointerEnter={showDropdownMenu} onPointerLeave={hideDropdownMenu}>
            <a className="nav-link dropdown-toggle" id="cameraPhotos">{item.menuTitle}</a>

            <ul className={className}>
              {menu.filter((child) => child.parentId === item.menu_id).map((child) => (
                <li data-id={child.menu_id} key={child.menu_id} className="dropdown-item"><a>{child.menuTitle}</a></li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
