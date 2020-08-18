import { useState } from 'react';

const useMenu = ({ setShowBackDrop }) => {
  const [currentItem, setCurrentItem] = useState(null);

  const showDropdownMenu = (event) => {
    const currentMenuIndex = event.currentTarget.dataset.menuTo;

    setCurrentItem(currentMenuIndex);
    setShowBackDrop(true);
  };

  const hideDropdownMenu = () => {
    setCurrentItem(null);
    setShowBackDrop(false);
  };

  return {
    showDropdownMenu,
    hideDropdownMenu,
    currentItem,
  };
};

export default useMenu;
