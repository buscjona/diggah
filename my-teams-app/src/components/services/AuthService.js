import { useState } from 'react';

const config = {
  clientId: '6d0c1b1b-49c2-4cd5-a9c7-54f32e98ba2e',
  clientSecret: 'db94a65d-6849-41a7-94e1-0cd2aa33c677',
};

const AuthService = () => {
  const [accessToken, setAccessToken] = useState(null);

  const requestAccessToken = async () => {
    const tokenEndpoint = `https://login.microsoftonline.com/99a0d3d4-d7f3-4aba-bba6-2a0eeded1dbf/oauth2/v2.0/token`;
    const bodyParams = {
      client_id: config.clientId,
      scope: 'https://graph.microsoft.com/.default',
      client_secret: config.clientSecret,
      grant_type: 'client_credentials',
    };

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(bodyParams),
      });

      const data = await response.json();
      if (response.ok) {
        const accessToken = data.access_token;
        setAccessToken(accessToken);
      } else {
        // Handle token request error
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  // Call the requestAccessToken function to retrieve the access token
  requestAccessToken();

  return { accessToken };
};

export default AuthService;
