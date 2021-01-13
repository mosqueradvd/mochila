import { setCurrentUser } from 'dux/loginSlice'
import { initializeStore } from 'dux/store'
import { getCurrentUser } from './auth0'

export async function getServerSideProps ({ req, res }) {
  const user = await getCurrentUser(req)

  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  if (user) {
    const { userEmail, userName, userRole = 'operator', userStatus = null, organizationId = null } = user
    dispatch(setCurrentUser({ userEmail, userName, userRole, userStatus, organizationId }))
  }

  return { props: { initialReduxState: reduxStore.getState() } }
}
