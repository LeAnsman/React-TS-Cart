import { createContext, ReactElement, useState } from "react";

export type Product = {
  sku: string;
  name: string;
  price: number;
};

export type UseProductsContext = {
  products: Product[];
};

type ChildrenType = { children?: ReactElement | ReactElement[] };

const initialState: Product[] = [
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

const initialContextState: UseProductsContext = { products: [] };

const ProductsContext = createContext<UseProductsContext>(initialContextState);

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<Product[]>(initialState);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
