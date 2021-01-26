import React, { useEffect, useState } from 'react';
import Menu from '@/components/ui/Menu/Menu';
import loadMenu from '@/services/loadMenu';
import EmptyLayout from '@/components/ui/Layout/EmptyLayout';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'row',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

const EmptyLayoutWithMenu = ({ children }) => {
  const classes = useStyles();

  const [showBackDrop, setShowBackDrop] = useState(false);
  const backDropClassName = `backdrop ${showBackDrop && 'show'}`;
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    loadMenu().then(setMenu);
  }, []);

  return (
    <EmptyLayout>
      <div className={backDropClassName} />
      <div className={classes.main}>
        <div className="col-lg-3 main-menu">
          {menu && <Menu menu={menu} setShowBackDrop={setShowBackDrop} />}
        </div>
        {children}
      </div>
    </EmptyLayout>
  );
};

export default EmptyLayoutWithMenu;
