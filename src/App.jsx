import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import Pizza from "./pages/Pizza.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
const ProtectedRoute = ({ element }) => {
  const isAuth = JSON.parse(localStorage.getItem("auth") || "{}")?.token;
  return isAuth ? element : <Navigate to="/login" replace />;
};


export default function App() {
  const [cartTotal, setCartTotal] = useState(0);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cartTotal={cartTotal} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <main className="container my-5 flex-grow-1">
                <Home />
              </main>
            </>
          }
        />
        <Route
          path="/register"
          element={
            <main className="container my-5 flex-grow-1">
              <Register />
            </main>
          }
        />
        <Route
          path="/login"
          element={
            <main className="container my-5 flex-grow-1">
              <Login />
            </main>
          }
        />
        <Route
          path="/cart"
          element={
            <main className="container my-5 flex-grow-1">
              <Cart onTotalChange={setCartTotal} />
            </main>
          }
        />
        <Route
          path="/pizza/p001"
          element={
            <main className="container my-5 flex-grow-1">
              <Pizza />
            </main>
          }
        />
        <Route
          path="/profile"
          element={
            <main className="container my-5 flex-grow-1">
              <Profile />
            </main>
          }
        />
        <Route
          path="/404"
          element={
            <main className="container my-5 flex-grow-1">
              <NotFound />
            </main>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
