import Layout from "../Layout/Layout";
import "../App.css";
import { useCart, useCartActions } from "../Context/CartProvider";
import { checkInCart } from "../Components/utils/checkInCart";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import getProducts from "../httpServices/getProducts";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts("https://nodejs-post-app.herokuapp.com/api/product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const { cart } = useCart();
  const dispatch = useCartActions();
  const addProductHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} Added To Cart !`);
  };

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {products.map((product) => {
            return (
              <section key={product._id} className="product">
                <div className="productImg">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="productDesc">
                  <p>{product.name}</p>
                  <p> $ {product.price}</p>
                  <button
                    onClick={() => addProductHandler(product)}
                    className="btn primary"
                  >
                    {checkInCart(cart, product._id) ? "In Cart" : "Add To Cart"}
                  </button>
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
