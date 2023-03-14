import { useState } from "react";
import useCart from "../hooks/useCart";
import CartLineItem from "./CartLineItem";

export default function Cart() {
  const [confirm, setConfirm] = useState(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const handleClick = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  return (
    <main className="main main--cart">
      {confirm ? (
        <h2>Thank you for your order</h2>
      ) : (
        <>
          <h2 className="offscreen">Cart</h2>
          <ul className="cart">
            {cart.map((item) => (
              <CartLineItem
                key={item.sku}
                item={item}
                dispatch={dispatch}
                REDUCER_ACTIONS={REDUCER_ACTIONS}
              />
            ))}
          </ul>
          <div className="card__totals">
            <p>Total Items : {totalItems}</p>
            <p>Total Price : {totalPrice}</p>
            <button
              className="cart__submit"
              disabled={!totalItems}
              onClick={handleClick}
            >
              Place order
            </button>
          </div>
        </>
      )}
    </main>
  );
}
