import Nav from "./Nav";

type HeaderProps = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ viewCart, setViewCart }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__title-bar">
        <h1>MyCart</h1>
        <div className="header__price-box">
          <p>Total Items : </p>
          <p>Total Price : </p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );
}
