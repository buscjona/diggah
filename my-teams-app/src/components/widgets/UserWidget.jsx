import React, { useState, useEffect } from 'react';
import * as microsoftTeams from '@microsoft/teams-js';

const UserWidget = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    microsoftTeams.initialize();

    microsoftTeams.getContext((context) => {
      // Extract relevant user data from the context object
      const { userPrincipalName, upn, userObjectId } = context;

      // Fetch the user's profile picture using Microsoft Graph API
      microsoftTeams.authentication.getAuthToken({
        successCallback: (accessToken) => {
          const graphEndpoint = `https://graph.microsoft.com/v1.0/users/${userObjectId}/photo/$value`;
          const headers = new Headers();
          headers.append('Authorization', `Bearer ${accessToken}`);

          fetch(graphEndpoint, {
            method: 'GET',
            headers: headers
          })
            .then(response => response.blob())
            .then(blob => {
              // Convert the image blob to a data URL
              const reader = new FileReader();
              reader.onloadend = () => {
                const imageUrl = reader.result;
                setUser({ userPrincipalName, upn, imageUrl });
              };
              reader.readAsDataURL(blob);
            })
            .catch(error => {
              console.error('Error fetching profile picture:', error);
              setUser({ userPrincipalName, upn, imageUrl: null });
            });
        },
        failureCallback: (error) => {
          console.error('Error getting access token:', error);
          setUser({ userPrincipalName, upn, imageUrl: null });
        },
        resources: ['https://graph.microsoft.com'],
        scopes: ['User.Read']
      });
    });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" />
          ) : (
            <div>No Image</div>
          )}
          <p>Username: {user.userPrincipalName}</p>
          <p>Email: {user.upn}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserWidget;
