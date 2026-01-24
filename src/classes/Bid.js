const fetch = require("node-fetch");

class Bid {
  constructor({ accessToken, sandbox = false }) {
    if (!accessToken) {
      throw new Error("accessToken is required");
    }

    this.accessToken = accessToken;
    this.sandbox = sandbox;

    this.projectBaseUrl = sandbox
      ? "https://www.freelancer-sandbox.com/api/projects/0.1"
      : "https://www.freelancer.com/api/projects/0.1";

    this.userBaseUrl = sandbox
      ? "https://www.freelancer-sandbox.com/api/users/0.1"
      : "https://www.freelancer.com/api/users/0.1";
  }

  async request(method, url, body = null) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        "freelancer-oauth-v1": this.accessToken,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data?.message || "Freelancer API Error");
      error.status = res.status;
      error.details = data;
      throw error;
    }

    return data;
  }

  async getMyUserId() {
    const data = await this.request(
      "GET",
      `${this.userBaseUrl}/self/`
    );

    if (!data?.result?.id) {
      throw new Error("Failed to retrieve self user ID");
    }

    return Number(data.result.id);
  }

  async placeBid(projectId, bidData = {}) {
    const bidderId = await this.getMyUserId();

    const payload = {
      project_id: Number(projectId),
      bidder_id: bidderId,
      amount: Number(bidData.amount),
      period: Number(bidData.period),
      description: String(bidData.description || ""),
      milestone_percentage: bidData.milestone_percentage ?? 0,
      sponsored: Boolean(bidData.sponsored),
      highlighted: Boolean(bidData.highlighted),
    };

    return this.request(
      "POST",
      `${this.projectBaseUrl}/bids/`,
      payload
    );
  }
}

module.exports = Bid;