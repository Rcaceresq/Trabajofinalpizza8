import React from "react";
import { useUser } from "../context/UserContext.jsx";
import { NavLink, Link } from "react-router-dom";

const formatCLP = (v) =>
  Number(v || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

export default function Navbar({ cartTotal = 0 }) {
  const { isAuthenticated, logout } = useUser() || {};
  const active = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          🍕 Pizzería Mamma Mía
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className={active} to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className={active} to="/cart">Cart</NavLink></li>
            {isAuthenticated ? (
              <>
                <li className="nav-item"><NavLink className={active} to="/profile">Profile</NavLink></li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><NavLink className={active} to="/register">Register</NavLink></li>
                <li className="nav-item"><NavLink className={active} to="/login">Login</NavLink></li>
              </>
            )}
            {/* /pizza/p001 no va en el navbar */}
          </ul>
          <Link className="btn btn-info text-dark fw-semibold" to="/cart">
            🛒 Total: {formatCLP(cartTotal)}
          </Link>
        </div>
      </div>
    </nav>
  );
}
