export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    const { token } = JSON.parse(raw);
    return token || null;
  } catch (e) {
    return null;
  }
}

export async function apiFetch(path, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();
  const rs = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = await rs.json().catch(() => ({}));
  if (!rs.ok) {
    const msg = data?.message || data?.error || (rs.status + " " + rs.statusText);
    throw new Error(msg);
  }
  return data;
}
