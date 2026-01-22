# Freelancer Kit 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)](https://www.javascript.com/)

This repository provides a comprehensive JavaScript toolkit for interacting with the Freelancer API. Designed for Node.js environments, it simplifies common tasks such as authentication, profile management, and project searching.

## Features ✨

*   **Authentication:** Securely authenticate with the Freelancer API using OAuth 2.0.
*   **Token Management:** Easily handle access and refresh tokens for persistent API access.
*   **Profile Retrieval:** Fetch and manage your Freelancer profile information.
*   **Project Searching:** Efficiently search for projects based on various criteria.

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
const FreelancerAuth = require('freelancer-kit').FreelancerAuth;

const auth = new FreelancerAuth({
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    redirectUri: 'YOUR_REDIRECT_URI'
});

// Get authorization URL
const authorizationUrl = auth.getAuthorizationUrl(['email', 'profile']);
console.log('Please visit this URL to authorize:', authorizationUrl);

// After user authorizes, you'll receive a code. Exchange it for tokens.
// Assuming you have the authorization code:
async function exchangeCodeForToken(code) {
    try {
        const tokens = await auth.exchangeCodeForToken(code);
        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);
        // Store tokens securely
    } catch (error) {
        console.error('Error exchanging code for token:', error);
    }
}

// Example of refreshing a token
async function refreshTokenExample(refreshToken) {
    try {
        const newTokens = await auth.refreshToken(refreshToken);
        console.log('New Access Token:', newTokens.access_token);
        // Update stored tokens
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
}
```

### Self Profile Example

```javascript
const SelfProfile = require('freelancer-kit').SelfProfile;
const FreelancerAuth = require('freelancer-kit').FreelancerAuth; // Needed for token management

// Assuming you have obtained and stored your access token
const accessToken = 'YOUR_STORED_ACCESS_TOKEN';

async function getProfile() {
    try {
        const profile = new SelfProfile(accessToken);
        const userProfile = await profile.getProfile();
        console.log('User Profile:', userProfile);
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}

getProfile();
```

### Search Projects Example

```javascript
const SearchProjects = require('freelancer-kit').SearchProjects;
const FreelancerAuth = require('freelancer-kit').FreelancerAuth; // Needed for token management

// Assuming you have obtained and stored your access token
const accessToken = 'YOUR_STORED_ACCESS_TOKEN';

async function searchProjects() {
    try {
        const searcher = new SearchProjects(accessToken);
        const projects = await searcher.search({
            limit: 10,
            full_description: 1,
            query: 'web development'
        });
        console.log('Found Projects:', projects);
    } catch (error) {
        console.error('Error searching projects:', error);
    }
}

searchProjects();
```

## Contributing 🤝

We welcome contributions to `freelancer-kit`! Please follow these guidelines:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix.
3.  **Make your changes** and ensure they are well-documented.
4.  **Add tests** for your new functionality.
5.  **Submit a Pull Request** with a clear description of your changes.

Please ensure your code adheres to the existing style and formatting.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## API Documentation 📚

The `freelancer-kit` library exposes several classes to interact with the Freelancer API.

### `FreelancerAuth` 🔐

Handles authentication and token management.

**Constructor:**

```javascript
new FreelancerAuth(options: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
})
```

**Methods:**

*   `getAuthorizationUrl(scopes: string[]): string`
    *   Generates the OAuth 2.0 authorization URL.
*   `exchangeCodeForToken(code: string): Promise<TokenResponse>`
    *   Exchanges an authorization code for an access token and refresh token.
*   `refreshToken(refreshToken: string): Promise<TokenResponse>`
    *   Refreshes an expired access token using a refresh token.

### `SearchProjects` 🔍

Facilitates searching for projects.

**Constructor:**

```javascript
new SearchProjects(accessToken: string)
```

**Methods:**

*   `search(params: SearchParams): Promise<Project[]>`
    *   Searches for projects.
    *   `SearchParams` can include:
        *   `limit`: Maximum number of results.
        *   `full_description`: Whether to include full project descriptions (1 for yes, 0 for no).
        *   `query`: Search term.
        *   `page`: Page number for results.
        *   `sort_field`: Field to sort by (e.g., 'time_left', 'budget').
        *   `sort_order`: Sort order ('asc' or 'desc').
        *   `min_budget`: Minimum budget for projects.
        *   `max_budget`: Maximum budget for projects.
        *   `category_id`: Filter by category ID.

### `SelfProfile` 👤

Provides access to the authenticated user's profile.

**Constructor:**

```javascript
new SelfProfile(accessToken: string)
```

**Methods:**

*   `getProfile(): Promise<UserProfile>`
    *   Fetches the authenticated user's profile information.

## Configuration Options & Environment Variables ⚙️

While the library can be configured directly via constructor options, it's recommended to use environment variables for sensitive information like API keys and secrets.

*   `FREELANCER_CLIENT_ID`: Your Freelancer API Client ID.
*   `FREELANCER_CLIENT_SECRET`: Your Freelancer API Client Secret.
*   `FREELANCER_REDIRECT_URI`: Your registered Redirect URI.

When using these environment variables, you can instantiate classes without passing explicit options:

```javascript
// Example using environment variables for FreelancerAuth
const auth = new FreelancerAuth(); // Reads from process.env.FREELANCER_CLIENT_ID, etc.
```

---
