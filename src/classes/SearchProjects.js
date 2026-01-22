const fetch = require("node-fetch");

class SearchProjects {
  constructor({ accessToken, sandbox = false }) {
    if (!accessToken) {
      throw new Error("accessToken is required");
    }

    this.accessToken = accessToken;
    this.baseUrl = sandbox
      ? "https://www.freelancer-sandbox.com/api/projects/0.1"
      : "https://www.freelancer.com/api/projects/0.1";
  }


  async search(filters = {}) {
    const url = new URL(`${this.baseUrl}/projects/all/`);

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          url.searchParams.append(`${key}[]`, v);
        });
      } else {
        url.searchParams.append(key, value);
      }
    });

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "freelancer-oauth-v1": this.accessToken,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "Freelancer API Error");
      error.status = res.status;
      error.details = data;
      throw error;
    }

    return data;
  }
}

module.exports = SearchProjects;
