const { SelfProfile } = require("../src/index");
(async () => {
  try {
    const profile = new SelfProfile({
      accessToken: "access_token",
      sandbox: true
    });

    const res = await profile.getMyProfile({
      avatar: true,
      display_info: true,
      profile_description: true,
    });

    console.log(res);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
