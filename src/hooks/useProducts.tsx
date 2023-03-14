import { useContext } from "react";
import ProductsContext from "../contexts/ProductsProvider";
import { UseProductsContextType } from "../contexts/ProductsProvider";

const useProducts = (): UseProductsContextType => {
  return useContext(ProductsContext);
};

export default useProducts;
