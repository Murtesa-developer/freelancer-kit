const { PostProject } = require("../src/index");

(async () => {
  try {
    const postProject = new PostProject({
      accessToken: "acess token", // set your token
      sandbox: true,
    });

    const project = await postProject.create({
      title: "Build my Super Website!",
      description: "I need a modern responsive website built with React.",
      currency: { id: 1 }, // USD
      budget: {
        minimum: 20,
        maximum: 80,
        currency_id: 1,
      },
      jobs: [
        { id: 7 }, // JAVA
      ],
      type: "FIXED",
    });

    console.log("Project created successfully!");
    console.log(project);

  } catch (err) {
    console.error("Failed to create project");
    console.error("Status:", err.status);
    console.error("Details:", err.details || err.message);
  }
})();