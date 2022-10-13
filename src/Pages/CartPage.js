import { Link } from "react-router-dom";
import { useCart, useCartActions } from "../Context/CartProvider";
import Layout from "../Layout/Layout";
import "./CartPage.css";

const CartPage = () => {
  const { cart, total } = useCart();
  const dispatch = useCartActions();
  if (!cart.length)
    return (
      <Layout>
        <h2>Cart Is Empty</h2>
      </Layout>
    );

  const incrementHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };

  const decrementHandler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };
  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => {
              return (
                <div className="cartItem" key={item._id}>
                  <div className="itemImg">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.offPrice * item.quantity} $</div>
                  <div className="btnGroup">
                    <button onClick={() => decrementHandler(item)}>-</button>
                    <button>{item.quantity}</button>
                    <button onClick={() => incrementHandler(item)}>+</button>
                  </div>
                </div>
              );
            })}
          </section>
          <CartSummery total={total} cart={cart} />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummery = ({ total, cart }) => {
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;
  return (
    <section className="cartSummery">
      <h2>Cart summery</h2>
      <div className="summeryItem">
        <p>Original total price</p>
        <p>{originalTotalPrice} $</p>
      </div>
      <div className="summeryItem">
        <p>Cart discount</p>
        <p>{originalTotalPrice - total} $</p>
      </div>
      <div className="summeryItem pure">
        <p>Pure Price</p>
        <p>{total} $</p>
      </div>
      <Link to="/signup?redirect=checkout">
        <button className="btn primary">Go To Checkout</button>
      </Link>
    </section>
  );
};
