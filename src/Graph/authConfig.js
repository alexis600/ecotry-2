export const msalConfig = {
    auth: {
      clientId: "3597fbc9-8046-4584-b73c-34aa89012949",
      authority: 'https://login.microsoftonline.com/364e6b43-9139-493a-98bc-dea39ac88451', // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "https://192.168.0.131:4600",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read",
   'mailboxsettings.read']
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };