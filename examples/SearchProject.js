const { SearchProjects } = require("../src/index");

const projects = new SearchProjects({
  accessToken: "access_token",
  sandbox: true,
});

(async () => {
  try {
    const result = await projects.search({
      query: "software",
      project_types: ["fixed"],
      min_price: 50,
      max_price: 1000,
      jobs: [1, 2, 3], // job id
      languages: ["en"],
      project_statuses: ["active"],
      sort_field: "time_updated",
      limit: 10,
      full_description: true,
      user_details: true,
    });

    console.log(result.result.projects);
  } catch (err) {
    console.error("Error:", err.details || err.message);
  }
})();
