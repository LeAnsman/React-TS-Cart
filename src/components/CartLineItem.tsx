import { ChangeEvent, ReactElement } from "react";
import { CartItemType } from "../contexts/CartProvider";
import { ReducerAction, ReducerActionType } from "../contexts/CartProvider";

type CartLineItemProps = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

export default function CartLineItem({
  item,
  dispatch,
  REDUCER_ACTIONS,
}: CartLineItemProps) {
  const img: string = new URL(
    `../assets/images/${item.sku}.jpg`,
    import.meta.url
  ).href;

  const lineTotal: number = item.quantity * item.price;

  const highestQuantity: number = 10 > item.quantity ? 10 : item.quantity;

  const optionValues: number[] = [...Array(highestQuantity).keys()].map(
    (i) => i + 1
  );

  const handleChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, quantity: Number(e.target.value) },
    });
  };

  const handleRemoveFromCart = () => {
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });
  };

  return (
    <div>
      <li className="cart__item">
        <img src={img} alt={item.name} className="cart__img" />
        <div aria-label="Item Name">{item.name}</div>
        <div aria-label="Price Per Item">
          {new Intl.NumberFormat("be-FR", {
            style: "currency",
            currency: "EUR",
          }).format(item.price)}
        </div>
        <label htmlFor="itemQuantity" className="offscreen">
          Item Quantity
        </label>
        <select
          aria-label="Item Quantity"
          name="itemQuantity"
          id="itemQuantity"
          className="cart__select"
          value={item.quantity}
          onChange={handleChangeQuantity}
        >
          {optionValues.map((value) => {
            return <option key={`opt${value}`}>{value}</option>;
          })}
        </select>
        <div aria-label="Line Item Subtotal" className="cart__item-subtotal">
          {new Intl.NumberFormat("be-FR", {
            style: "currency",
            currency: "EUR",
          }).format(lineTotal)}
        </div>
        <button
          aria-label="Remove Item From Cart"
          className="cart__button"
          onClick={handleRemoveFromCart}
        >
          &#215;
        </button>
      </li>
    </div>
  );
}
