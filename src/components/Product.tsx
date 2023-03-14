import { ProductType } from "../contexts/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../contexts/CartProvider";
import { ReactElement } from "react";

type ProductProps = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

export default function Product({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: ProductProps): ReactElement {
  // dynamic images
  const img: string = new URL(
    `../assets/images/${product.sku}.jpg`,
    import.meta.url
  ).href;

  const onAddToCart = () => {
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <article className="article">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("be-FR", {
          style: "currency",
          currency: "EUR",
        }).format(product.price)}
        {inCart ? "-> Item in cart : V" : null}
      </p>
      <button onClick={onAddToCart}>Add to cart</button>
    </article>
  );
}
