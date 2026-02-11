import { login } from "../auth.js";

export function initLoginPage() {
  document.getElementById("login-btn").onclick = async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const result = await login(email, password);
    console.log(result);
  };
}
