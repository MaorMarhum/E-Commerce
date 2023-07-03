import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import {
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import cases from "../AppContext";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const { state, dispatch } = useContext(AppContext);
  const { cartItems } = state;

  const getTotal = (cartItems) => {
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
      const { price, quantity } = cartItems[i];
      total += price * quantity;
    }

    return total;
  };
  const total = getTotal(cartItems).toFixed(2);

  const removeFromCart = (itemId) => {
    dispatch({ type: cases.REMOVE_FROM_CART, payload: itemId });
  };

  const increaseQuantity = (itemId) => {
    dispatch({ type: cases.INCREASE_QUANTITY, payload: itemId });
  };

  const decreaseQuantity = (itemId) => {
    dispatch({ type: cases.DECREASE_QUANTITY, payload: itemId });
  };

  const checkout = () => {
    let payload = []
    for (let i = 0; i < cartItems.length; i++) {
      payload.push({id: cartItems[i].id, quantity: cartItems[i].quantity})
    }
    
    fetch(`${process.env.REACT_APP_SERVER_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('error while checkout')
        }
      }).then(({url}) => {
        window.location = url;
      })
      .catch(error => {
        console.error('Error during checkout:', error);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "4rem",
      }}
    >
      <Paper
        style={{
          padding: "16px",
        }}
        elevation={3}
      >
        <Typography align="center" variant="h6" component="h2" gutterBottom>
          Your Cart
        </Typography>
        {cartItems.length === 0 ? (
          <div>Your Cart is Empty</div>
        ) : (
          cartItems.map((product) => {
            const { id, img_path, name, price, quantity } = product;

            return (
              <Card
                key={id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <CardMedia
                  component="img"
                  src={img_path}
                  alt={name}
                  style={{ width: 100, height: 100, marginRight: "1rem" }}
                />
                <CardContent>
                  <Typography style={{ maxWidth: "110px" }} variant="h6">
                    {name}
                  </Typography>
                  <Typography variant="body1">Price: ${price}</Typography>
                  <Typography variant="body2">Quantity: {quantity}</Typography>
                </CardContent>
                <div style={{ marginRight: "1rem" }}>
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => increaseQuantity(id)}
                  />
                  <RemoveIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => decreaseQuantity(id)}
                  />
                  <RemoveShoppingCartIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFromCart(id)}
                  />
                </div>
              </Card>
            );
          })
        )}
        <Typography align="center" variant="h6" component="h2" gutterBottom>
          Your Total: ${total}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button disabled={cartItems.length === 0} variant="contained" onClick={checkout}>
            Checkout
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Cart;
