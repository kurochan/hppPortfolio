import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useMenuContainer = () => {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen(open => !open);
  };

  return { open, toggle };
};

export const MenuContainer = createContainer(useMenuContainer);

export default MenuContainer;
