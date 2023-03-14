import { useState } from "react";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

function App() {
  const [viewCart, setViewCart] = useState(false);

  return (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {viewCart ? <Cart /> : <ProductList />}
      <Footer viewCart={viewCart} />
    </>
  );
}

export default App;
