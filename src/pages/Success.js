import React, { useContext, useEffect } from "react";
import { Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

const Success = () => {
  const { clearCart } = useContext(AppContext);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

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
        <Typography align="center" variant="h5" component="h2" gutterBottom>
          Thank You for Your Order
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <Button variant="contained" to="/" component={Link}>
            back home
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Success;
