import { testAPI } from "../api.js";

export async function initKineportPage() {
  const data = await testAPI();
  document.getElementById("api-result").textContent = data.message;
}