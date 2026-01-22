const fetch = require("node-fetch");

class SelfProfile {
  constructor({ accessToken, sandbox = false }) {
    if (!accessToken) {
      throw new Error("accessToken is required");
    }

    this.accessToken = accessToken;
    this.sandbox = sandbox;

    this.baseUrl = sandbox
      ? "https://www.freelancer-sandbox.com/api/users/0.1"
      : "https://www.freelancer.com/api/users/0.1";
  }

  buildQuery(params = {}) {
    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value === true) {
        query.append(key, "true");
      } else if (value !== false && value != null) {
        query.append(key, String(value));
      }
    }

    return query.toString();
  }

  async request(endpoint) {
    const res = await fetch(this.baseUrl + endpoint, {
      headers: {
        Accept: "application/json",
        "freelancer-oauth-v1": this.accessToken,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(JSON.stringify(data, null, 2));
    }

    return data;
  }

  filterProfile(user, params) {
    const result = {};

    if (params.avatar === true) {
      result.avatar = user.avatar_xlarge_cdn || user.avatar_xlarge;
    }

    if (params.display_info === true) {
      result.display_name = user.display_name;
      result.tagline = user.tagline;
      result.location = user.location;
    }

    if (params.profile_description === true) {
      result.profile_description = user.profile_description;
    }

    if (params.reputation === true) {
      result.reputation = user.reputation;
    }

    if (params.cover_image === true) {
      result.cover_image = user.cover_image;
    }

    return result;
  }

  async getMyProfile(params = {}) {
    const query = this.buildQuery(params);
    const endpoint = `/self/${query ? `?${query}` : ""}`;

    const response = await this.request(endpoint);

    if (!response || !response.result) {
      throw new Error("Invalid API response");
    }

    return this.filterProfile(response.result, params);
  }
}

module.exports = SelfProfile;
