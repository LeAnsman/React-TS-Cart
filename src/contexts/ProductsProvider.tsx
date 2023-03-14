import { createContext, ReactElement, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

export type UseProductsContextType = {
  products: ProductType[];
};

type ChildrenType = { children?: ReactElement | ReactElement[] };

const initialState: ProductType[] = [
  {
    sku: "item0001",
    name: "Widget",
    price: 9.99,
  },
  {
    sku: "item0002",
    name: "Premium Widget",
    price: 19.99,
  },
  {
    sku: "item0003",
    name: "Deluxe Widget",
    price: 39.99,
  },
];

const initialContextState: UseProductsContextType = { products: [] };

const ProductsContext =
  createContext<UseProductsContextType>(initialContextState);

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initialState);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
