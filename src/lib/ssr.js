import { setCurrentUser, setUnauthorizedUser } from 'dux/loginSlice'
import { initializeStore } from 'dux/store'
import { getCurrentUser } from './auth0'

export async function getServerSideProps ({ req, res }) {
  const user = await getCurrentUser(req, res)

  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  const { userEmail, unAuthorizedUser, userName, userRole = 'operator', userStatus = null, organizationId = null } = user

  if (user?.userEmail) {
    dispatch(setCurrentUser({ userEmail, userName, userRole, userStatus, organizationId }))
  } else {
    dispatch(setUnauthorizedUser({ unAuthorizedUser }))
  }

  return { props: { initialReduxState: reduxStore.getState() } }
}
