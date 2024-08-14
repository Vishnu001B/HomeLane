import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckoutIcon from '@mui/icons-material/Payment';
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';

export default function Drawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  // Fetching bag data from Redux store
  const bag = useSelector((store) => store.bag) || { totalQuantity: 0, data: [] };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 300, padding: 2 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h6" gutterBottom>
        Your Cart
      </Typography>
      <List>
        {bag.data.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Avatar
              alt={item.name}
              src={item.img}
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity} | Price: ₹${item.price}`}
            />
            <IconButton aria-label="view" onClick={() => handleView(item)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={() => handleEdit(item)}>
              <EditIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckoutIcon />}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );

  const handleView = (item) => {
    // Logic to view item details
    alert(`Viewing details for ${item.name}`);
  };

  const handleEdit = (item) => {
    // Logic to edit item
    alert(`Editing ${item.name}`);
  };

  const handleCheckout = () => {
    // Logic to handle checkout
    alert('Proceeding to checkout');
  };

  return (
    <div>
      <Button onClick={toggleDrawer('right', true)}>
        <ShoppingCartIcon />
        <Typography variant="body2" sx={{ ml: 1 }}>
          ({bag.totalQuantity})
        </Typography>
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </div>
  );
}
