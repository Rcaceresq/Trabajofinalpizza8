import { useEffect } from "react";
import { useUser } from "../context/UserContext.jsx";

export default function Profile() {
  const { email, logout, profile, fetchMe } = useUser() || {};

  useEffect(() => {
    fetchMe?.().catch(() => {});
  }, []);

  return (
    <div className="card card-body">
      <h2 className="h5 mb-3">Perfil</h2>
      <p className="mb-1"><strong>Email:</strong> {profile?.email || email}</p>
      {profile?.name && <p className="mb-1"><strong>Nombre:</strong> {profile.name}</p>}
      <button className="btn btn-outline-danger mt-2" onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
