type HeaderProps = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Nav({ viewCart, setViewCart }: HeaderProps) {
  return (
    <nav className="nav">
      {viewCart ? (
        <button onClick={() => setViewCart(false)}>View Products</button>
      ) : (
        <button onClick={() => setViewCart(true)}>View Cart</button>
      )}
    </nav>
  );
}
