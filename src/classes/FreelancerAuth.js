const fetch = require("node-fetch");
const readline = require("readline");

class FreelancerAuth {
  constructor({ clientId, clientSecret, redirectUri = "http://localhost", sandbox = false, flags = {} }) {
    if (!clientId || !clientSecret) throw new Error("clientId and clientSecret are required");

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.sandbox = sandbox;
    this.flags = flags;
    this.token = null;
    this.refreshToken = null;

    this.oauthUrl = sandbox
      ? "https://accounts.freelancer-sandbox.com/oauth"
      : "https://accounts.freelancer.com/oauth";
  }

  generateAuthLink() {
    const scopes = ["basic"];
    if (this.flags.project_create) scopes.push("1");
    if (this.flags.project_manage) scopes.push("2");
    if (this.flags.contest_create) scopes.push("3");
    if (this.flags.contest_manage) scopes.push("4");
    if (this.flags.messaging) scopes.push("5");
    if (this.flags.user_information) scopes.push("6");
    if (this.flags.location_tracking_create) scopes.push("7");
    if (this.flags.location_tracking_view) scopes.push("8");
    
    const scopeString = scopes.join(" ");
    return `${this.oauthUrl}/authorise?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(
      this.redirectUri
    )}&scope=${encodeURIComponent(scopeString)}`;
  }

  async exchangeCode(code) {
    const url = `${this.oauthUrl}/token`;
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: code.trim(),
      redirect_uri: this.redirectUri,
    });

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const text = await res.text();
    if (!res.ok) throw new Error(`Token request failed: ${res.status} ${res.statusText}\n${text}`);

    const data = JSON.parse(text);
    this.token = data.access_token;
    this.refreshToken = data.refresh_token;
    return data;
  }

  async refreshTokenRequest() {
    if (!this.refreshToken) throw new Error("No refresh token available");

    const url = `${this.oauthUrl}/token`;
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: this.refreshToken,
    });

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const text = await res.text();
    if (!res.ok) throw new Error(`Refresh token request failed: ${res.status} ${res.statusText}\n${text}`);

    const data = JSON.parse(text);
    this.token = data.access_token;
    this.refreshToken = data.refresh_token;
    return data;
  }

  async request(endpoint, options = {}) {
    if (!this.token) throw new Error("No access token, authenticate first");
    const url = `https://www.freelancer.com/api${endpoint}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: "Bearer " + this.token,
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`API request failed: ${res.status} ${res.statusText}\n${text}`);
    return JSON.parse(text);
  }

  static askCode(promptText = "Enter the code you received: ") {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => rl.question(promptText, (ans) => { rl.close(); resolve(ans); }));
  }
}
module.exports = FreelancerAuth;