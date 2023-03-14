import Nav from "./Nav";
import useCart from "../hooks/useCart";

type HeaderProps = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ viewCart, setViewCart }: HeaderProps) {
  const { totalItems, totalPrice } = useCart();

  return (
    <header className="header">
      <div className="header__title-bar">
        <h1>MyCart</h1>

        <div className="header__price-box">
          <p>Total Items : {totalItems}</p>
          <p>Total Price : {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );
}
