// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------


const API_BASE = "https://fancy-sound-b19d.loom-framework.workers.dev";

// Helper for GET requests
async function apiGet(path, token) {
  const headers = {};

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const res = await fetch(API_BASE + path, {
    method: "GET",
    headers: headers
  });

  return res.json();
}

// Helper for POST requests
async function apiPost(path, body, token) {
  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });

  return res.json();
}

// test

async function testAPI() {
  return apiGet("/test");
}

// system

async function checkHealth() {
  return apiGet("/system/health");
}

async function getServerTime() {
  return apiGet("/system/time");
}


// user

async function registerUser(email, password) {
  return apiPost("/user/register", { email: email, password: password });
}

async function loginUser(email, password) {
  return apiPost("/user/login", { email: email, password: password });
}

async function getCurrentUser(token) {
  return apiGet("/user/me", token);
}






// payment

async function createPaymentSession(token, payload) {
  return apiPost("/payments/create-session", payload, token);
}

// test usage

document.addEventListener("DOMContentLoaded", async () => {
  const data = await testAPI();
  document.getElementById("api-result").textContent = data.message;
});






// register usage

async function handleRegister() {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  const result = await registerUser(email, password);
  console.log(result);
}


// login usage usage

async function handleLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const result = await loginUser(email, password);

  if (result.token) {
    localStorage.setItem("token", result.token);
  }

  console.log(result);
}

// current user usage

async function loadUser() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const user = await getCurrentUser(token);
  console.log("Logged in user:", user);
}




