import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { useCart } from "../../Context/CartProvider";

const Checkout = () => {
  const auth = useAuth();
  const { cart, total } = useCart();
  if (!cart.length)
    return (
      <main className="container">
        <Link to="/">go to Shopping ?</Link>
      </main>
    );
  return (
    <main className="container">
      <section className="cartCenter">
        {auth ? (
          <>
            <section className="cartItemList">
              <h3>checkout detail</h3>
              <p>name : {auth.name}</p>
              <p>email : {auth.email}</p>
              <p>phoneNumber : {auth.phoneNumber}</p>
            </section>
            <section className="cartSummery">
              {cart &&
                cart.map((c) => {
                  return (
                    <div key={c._id}>
                      {c.name} * {c.quantity} : {c.quantity * c.offPrice}
                    </div>
                  );
                })}
              <hr />
              <div>Total Price: {total}</div>
            </section>
          </>
        ) : (
          <p>please login</p>
        )}
      </section>
    </main>
  );
};

export default Checkout;
