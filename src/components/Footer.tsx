import useCart from "../hooks/useCart";

type FooterProps = {
  viewCart: boolean;
};

export default function Footer({ viewCart }: FooterProps) {
  const { totalItems, totalPrice } = useCart();

  const year: number = new Date().getFullYear();

  return (
    <footer className="footer">
      {viewCart ? (
        <p>Shopping Cart &copy; {year}</p>
      ) : (
        <>
          <p>Total Items : {totalItems}</p>
          <p>Total Price : {totalPrice}</p>
          <p>Shopping Cart &copy; {year}</p>
        </>
      )}
    </footer>
  );
}
