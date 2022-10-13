import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { useCart } from "../../Context/CartProvider";
import "./Navigation.css";
const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();
  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <li>Amir Shopping</li>
          <li>
            <NavLink activeClassName="activeLink" to="/" exact={true}>
              Home
            </NavLink>
          </li>
        </ul>
        <ul>
          <li className="cartLink">
            <NavLink activeClassName="activeLink" to="/cart">
              Cart
            </NavLink>
            <span>{cart.length}</span>
          </li>
          <li>
            <NavLink
              activeClassName="activeLink"
              to={userData ? "/ProfilePage" : "/login"}
            >
              {userData ? "Profile" : "login / signup"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
