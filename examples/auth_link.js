const { FreelancerAuth } = require("../src/index");

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
