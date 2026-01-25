# Freelancer Kit 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)](https://www.javascript.com/)

This repository provides a comprehensive JavaScript toolkit for interacting with the Freelancer API. Designed for Node.js environments, it simplifies common tasks such as authentication, profile management, and project searching.

## Features ✨

*   **Authentication:** Securely authenticate with the Freelancer API using OAuth 2.0.
*   **Token Management:** Easily handle access and refresh tokens for persistent API access.
*   **Profile Retrieval:** Fetch and manage your Freelancer profile information.
*   **Project Searching:** Efficiently search for projects based on various criteria.
*   **Create Bid:** you can create a bid.

## Installation 📥

You can install `freelancer-kit` directly from npm:

```bash
npm install freelancer-kit
```

Alternatively, if you are developing locally or wish to contribute, you can clone the repository and install dependencies:

```bash
git clone https://github.com/Murtesa-developer/freelancer-kit.git
cd freelancer-kit
npm install
```

## Usage Examples 💡

### Authentication Example

```javascript
const { FreelancerAuth } = require("freelancer-kit");

(async () => {
  const clientId = "app_id";
  const clientSecret = "client_secret";
  const redirectUri = "https://example.com/callback";
  const sandbox = true;

  const flags = {
    messaging: true,        
    project_create: true,    
    project_manage: false,   
    contest_create: false,   
    contest_manage: false,   
    user_information: true,  
    location_tracking_create: false, 
    location_tracking_view: false,   
  };

  const auth = new FreelancerAuth({ clientId, clientSecret, redirectUri, sandbox, flags });

  const authUrl = auth.generateAuthLink();
  console.log("Open this link in your browser to authorize the app:");
  console.log(authUrl);
  const code = await FreelancerAuth.askCode("Enter the code you received: ");

  const tokens = await auth.exchangeCode(code.trim());

  console.log("Access Token:", tokens.access_token);
  console.log("Refresh Token:", tokens.refresh_token);
})();
```

### Self Profile Example

```javascript
const { SelfProfile } = require("freelancer-kit");
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
```

### Search Projects Example

```javascript
const { SearchProjects } = require("freelancer-kit");

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
```

## Contributing 🤝

We welcome contributions to `freelancer-kit`
## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## API Documentation 📚

The `freelancer-kit` library exposes several classes to interact with the Freelancer API.

### `FreelancerAuth` 🔐

Handles authentication and token management.

---
