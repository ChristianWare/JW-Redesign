import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

function CartPage() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
      cart: { cartItems },
    } = state;

    const removeItemHandler = (item) => {
      dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    };

    const updateCartHandler = async (item, qty) => {
      const quantity = Number(qty);
      const { data } = await axios.get(`/api/products/${item._id}`);
      if (data.countInStock < quantity) {
        return toast.error("Sorry, product is out of stock");
      }
      dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
      toast.success("Product updated in the cart");
    };

  return (
    <>
        <h1>Shopping Cart</h1>
    </>
  );
};

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });

