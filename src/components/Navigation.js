import React, { useContext } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

const Navigation = () => {
  const { state } = useContext(AppContext);
  const { cartItems } = state;

  const getQuantity = (cartItems) => {
    let count = 0;

    for (let i = 0; i < cartItems.length; i++) {
      count += cartItems[i].quantity;
    }
    return count;
  };
  const quantity = getQuantity(cartItems);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" style={{ position: "fixed" }}>
        <Toolbar>
          <Typography
            to="/"
            component={Link}
            variant="h6"
            style={{ textDecoration: "none", color: "white" }}
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            E-Commerce
          </Typography>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton to="/cart" component={Link} color="inherit">
              <Badge badgeContent={quantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button to="/cart" component={Link} sx={{ color: "#fff" }}>
              <Badge badgeContent={quantity} color="error">
                <ShoppingCartIcon sx={{ mr: 1 }} />
              </Badge>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
