const { TOKEN } = require("../src/index");

const client = new TOKEN({
  token: "access_token",
  sandbox: true,
});

(async () => {
  try {
    const valid = await client.validateToken();
    console.log("Token valid?", valid);
  } catch (err) {
    console.error("Error validating token:", err.message);
  }
})();
