const fetch = require("node-fetch");

class PostProject {
  constructor({ accessToken, sandbox = false }) {
    if (!accessToken) {
      throw new Error("accessToken is required");
    }

    this.accessToken = accessToken;
    this.baseUrl = sandbox
      ? "https://www.freelancer-sandbox.com/api/projects/0.1"
      : "https://www.freelancer.com/api/projects/0.1";
  }

  async create(projectData) {
    if (!projectData || typeof projectData !== "object") {
      throw new Error("projectData must be an object");
    }

    const res = await fetch(`${this.baseUrl}/projects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "freelancer-oauth-v1": this.accessToken,
      },
      body: JSON.stringify(projectData),
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

module.exports = PostProject;