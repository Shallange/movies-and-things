import { Link } from "react-router";
import { useSelector } from "react-redux";

import type { RootState } from "../store/store";

import "./Navbar.css";

function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        Movies & Things
      </Link>

      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
      </nav>
    </header>
  );
}

export default Navbar;