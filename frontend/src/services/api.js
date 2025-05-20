const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Login failed:", error);
      return null;
    }

    const data = await res.json();
    return data.access_token;
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
}

export async function register(email, password) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Register failed:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Register error:", err);
    return false;
  }
}

export async function getTasks(token) {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch tasks");

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createTask(token, description) {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description }),
    });

    if (!res.ok) throw new Error("Failed to create task");
  } catch (err) {
    console.error(err);
  }
}
