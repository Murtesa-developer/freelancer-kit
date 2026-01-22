const { FreelancerAuth } = require("../src");

(async () => {
  try {
    const auth = new FreelancerAuth({
      clientId: "app_id",
      clientSecret: "client_secret",
      sandbox: true,
    });

    auth.refreshToken = "refresh_token";

    const tokens = await auth.refreshTokenRequest();

    console.log("New Access Token:", tokens.access_token);
    console.log("New Refresh Token:", tokens.refresh_token);
  } catch (err) {
    console.error("Failed to refresh token:", err.message);
  }
})();
