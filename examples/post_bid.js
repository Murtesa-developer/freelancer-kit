const { Bid } = require("../src/index");

(async () => {
  try {
    const bid = new Bid({
      accessToken: "access_token",
      sandbox: true,
    });
                                
    const res = await bid.placeBid("project_id", {
      amount: "how much money",
      period: "how many days",
      description: "description",
      milestone_percentage: "milestone percentage",
    });

    console.log(`SUCCESS: Bid placed successfully (ID: ${res.result.id})`);
  } catch (err) {
    console.error(`FAILED: ${err.message}`);
  }
})();