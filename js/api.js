// -----------------------------------------------------------------------------
// Description: Application bootstrap and initialization logic.
// Author: Janis Bedeicis
// Github: https://github.com/loom-framework
// E-mail: loom.framework@gmail.com
// Created: 2008
// -----------------------------------------------------------------------------


const API_BASE = "#";

// Helper for GET requests
export async function apiGet(path, token) {
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
export async function apiPost(path, body, token) {
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

// ---- API Endpoints ----

// Test
export function testAPI() {
  return apiGet("/test");
}

// System
export function checkHealth() {
  return apiGet("/system/health");
}

export function getServerTime() {
  return apiGet("/system/time");
}

// User
export function registerUser(email, password) {
  return apiPost("/user/register", { email, password });
}

export function loginUser(email, password) {
  return apiPost("/user/login", { email, password });
}

export function getCurrentUser(token) {
  return apiGet("/user/me", token);
}

// Payments
export function createPaymentSession(token, payload) {
  return apiPost("/payments/create-session", payload, token);
}
