import { save, load } from "./storage.js";
import { loginUser, registerUser, getCurrentUser } from "./api.js";

export async function login(email, password) {
  const result = await loginUser(email, password);

  if (result.token) {
    save("token", result.token);
  }

  return result;
}

export async function register(email, password) {
  return registerUser(email, password);
}

export function getToken() {
  return load("token");
}

export async function loadUser() {
  const token = getToken();
  if (!token) return null;

  return getCurrentUser(token);
}
