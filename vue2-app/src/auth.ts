import { PublicClientApplication } from '@azure/msal-browser'

// Placeholder config; swap in the real tenant/client IDs.
export const msal = new PublicClientApplication({
  auth: {
    clientId: '00000000-0000-0000-0000-000000000000',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
  cache: { cacheLocation: 'localStorage' },
})
