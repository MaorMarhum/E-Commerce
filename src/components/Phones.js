import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Container,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { AppContext } from "../AppContext";
import cases from "../AppContext";

const Phones = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/products`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addToCart = (item) => {
    dispatch({ type: cases.ADD_TO_CART, payload: item });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No phones found</div>;
  }

  return (
    <Container maxWidth="lg" style={{ margin: "1rem auto", marginTop: "5rem" }}>
      <Grid container spacing={2}>
        {products.map((product) => {
          const { description, id, img_path, name, price } = product;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia component="img" alt="Product Image" src={img_path} />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {name}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {description}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Price: ${price}
                  </Typography>
                  <Button
                    style={{ marginTop: "1rem" }}
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Phones;
