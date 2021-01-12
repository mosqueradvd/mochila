import { initAuth0 } from '@auth0/nextjs-auth0'
import { findByEmail } from 'models/user'
import {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_REDIRECT_URI,
  AUTH0_POST_LOGOUT_URI,
  COOKIE_SECRET
} from './config'
const AUTH0_SCOPE = 'openid profile email'

export const auth0 = initAuth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  scope: AUTH0_SCOPE,
  redirectUri: AUTH0_REDIRECT_URI,
  postLogoutRedirectUri: AUTH0_POST_LOGOUT_URI,
  session: {
    cookieSecret: COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 8,
    cookieSameSite: 'lax'
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000
  }
})

export function getSession (req) {
  return auth0.getSession(req)
}

export async function getCurrentUser (req) {
  const session = await getSession(req)
  const user = session?.user

  if (user) {
    const dbUser = await findByEmail(user.email)

    if (dbUser) {
      const { userEmail, userName, userRol, userStatus, organizationId = null } = dbUser
      return { userEmail, userName, userRol, userStatus, organizationId }
    }
  }

  return null
}
