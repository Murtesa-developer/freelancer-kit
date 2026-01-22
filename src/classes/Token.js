const fetch = require("node-fetch");

class Token {
  constructor({ token, sandbox = false }) {
    if (!token) throw new Error("Token is required");
    this.token = token;
    this.baseUrl = sandbox
      ? "https://www.freelancer-sandbox.com/api"
      : "https://www.freelancer.com/api";
  }

  async request(endpoint, options = {}) {
    const url = this.baseUrl + endpoint;
    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: "Bearer " + this.token,
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Freelancer API error: ${res.status} ${res.statusText}\n${text}`);
    }
    return res.json();
  }

  async validateToken() {
    try {
      await this.request("/users/0.1/self/");
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = Token;
