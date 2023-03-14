import { useContext } from "react";
import CartContext from "../contexts/CartProvider";
import { UseCartContext } from "../contexts/CartProvider";

const useCart = (): UseCartContext => {
  return useContext(CartContext);
};

export default useCart;
