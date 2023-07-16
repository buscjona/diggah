require('isomorphic-fetch');
const { PublicClientApplication } = require('@azure/msal-node');
const graph = require('@microsoft/microsoft-graph-client');

let _settings = undefined;
let _userClient = undefined;

function initializeGraphForUserAuth(settings, deviceCodePrompt) {
  // Ensure settings isn't null
  if (!settings) {
    throw new Error('Settings cannot be undefined');
  }

  _settings = settings;

  const pcaConfig = {
    auth: {
      clientId: settings.clientId,
      authority: `https://login.microsoftonline.com/${settings.tenantId}`,
    },
    cache: {
      cachePlugin: require('msal-node-extensions').MongoDbPersistence,
      cachePluginConfig: {
        mongoDbConnectionString: 'mongodb://localhost:27017/msal',
        dbName: 'msal',
        collectionName: 'cache',
      },
    },
  };

  const pca = new PublicClientApplication(pcaConfig);

  _userClient = graph.Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async (options) => {
        const account = await pca.getTokenCache().getAccountByUsername(settings.username);
        if (!account) {
          throw new Error(`User account ${settings.username} not found in the cache.`);
        }

        const tokenResponse = await pca.acquireTokenSilent({
          account: account,
          scopes: settings.graphUserScopes,
        });

        return tokenResponse.accessToken;
      },
    },
  });
}

async function getUserTokenAsync() {
    // Ensure settings and _userClient are defined
    if (!_settings || !_userClient) {
      throw new Error('Graph has not been initialized for user auth');
    }
  
    // Request token with given scopes
    const response = await _userClient.getTokenSilent({
      scopes: _settings.graphUserScopes,
      account: _userClient.getActiveAccount(),
    });
  
    return response.accessToken;
  }

module.exports = {
  initializeGraphForUserAuth,
  getUserTokenAsync,
};
