import { loadUser } from "../auth.js";

export async function initDashboard() {
  const user = await loadUser();
  console.log("User:", user);
}
