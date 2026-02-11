import { testAPI } from "../api.js";

export async function initHomePage() {
  const data = await testAPI();
  document.getElementById("api-result").textContent = data.message;
}
