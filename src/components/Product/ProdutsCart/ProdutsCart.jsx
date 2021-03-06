import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useProducts } from "../../../contexts/ProductContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./ProductCard.css";
import { FcFullTrash } from "@react-icons/all-files/fc/FcFullTrash";
import { FcEditImage } from "@react-icons/all-files/fc/FcEditImage";

import { ADMIN } from "../../../helpers/consts";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductCard({ item }) {
  const { addProductToCart, checkProductInCart, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const {
    user: { email },
  } = useAuth();

  return (
    <>
      <Card className="div_cart" sx={{ borderRadius: 3 }}>
        <div className="cardProduct">
          <CardMedia
            className="cart_img"
            sx={{ borderRadius: 2 }}
            component="img"
            height="300"
            image={item.picture}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {item.description}
            </Typography>
          </CardContent>
        </div>
        <CardActions sx={{ bgcolor: "#000" }}>
          {email === ADMIN ? (
            <>
              {" "}
              <Button size="small" onClick={() => deleteProduct(item.id)}>
                <h2>
                  <FcFullTrash />
                </h2>
              </Button>
              <Button size="small" onClick={() => navigate(`/edit/${item.id}`)}>
                <h2>
                  <FcEditImage />
                </h2>
                edit
              </Button>
            </>
          ) : (
            <IconButton onClick={() => addProductToCart(item)}>
              <ShoppingCartIcon
                color={checkProductInCart(item.id) ? "secondary" : "primary"}
              />
            </IconButton>
          )}

          <span
            style={{ color: "#fff" }}
            onClick={() => navigate(`/products/${item.id}`)}
          >
            more...
          </span>
        </CardActions>
      </Card>
    </>
  );
}
