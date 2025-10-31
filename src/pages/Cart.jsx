import { useMemo, useState } from "react";
import { apiFetch } from "../services/api";
import { useUser } from "../context/UserContext.jsx";
import { pizzaCart } from "../data/pizzas";

const formatCLP = (v) =>
  v.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

const Cart = () => {

  const { isAuthenticated } = useUser() || {};
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useState(pizzaCart);

  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart((prev) => {
      const next = prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0);
      return next;
    });
  };

  const total = useMemo(
    () =>
      cart.reduce((acc, item) => {
        return acc + item.price * item.qty;
      }, 0),
    [cart]
  );

  return (
    <main className="container" style={{ padding: "1rem" }}>
      <h1>🛒 Carrito</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "1fr",
            maxWidth: 800,
          }}
        >
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                gap: "1rem",
                alignItems: "center",
                border: "1px solid #e5e5e5",
                borderRadius: 12,
                padding: "0.75rem",
                background: "#fff",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />

              <div>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ margin: "0.25rem 0" }}>
                  {formatCLP(item.price)} c/u
                </p>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => decrease(item.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    cursor: "pointer",
                  }}
                >
                  –
                </button>
                <strong>{item.qty}</strong>
                <button
                  type="button"
                  onClick={() => increase(item.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: "1px solid #111",
                    background: "#111",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #ddd",
              paddingTop: "1rem",
            }}
          >
            <h2 style={{ margin: 0 }}>Total: {formatCLP(total)}</h2>
            <button
              type="button"
              style={{
                border: "1px solid #28a745",
                background: "#28a745",
                color: "#fff",
                borderRadius: 8,
                padding: "0.6rem 1rem",
                cursor: "pointer",
              }}

              onClick={async () => {
              setSuccess("");
              try {
                setLoading(true);
                await apiFetch("/api/checkouts", { method: "POST", body: { cart } });
                setSuccess("¡Compra realizada con éxito!");
              } catch (err) {
                alert(err.message || "Error en el pago (requiere sesión)");
              } finally {
                setLoading(false);
              }
            }}
            >
              {loading ? "Procesando..." : "Pagar"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;