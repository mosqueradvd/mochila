import { setCurrentUser } from 'dux/loginSlice'
import { initializeStore } from 'dux/store'
import { getCurrentUser } from './auth0'
import * as userModel from 'models/user'

export async function getServerSideProps ({ req, res }) {
  const user = await getCurrentUser(req)

  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  if (user) {
    const userFromDB = await userModel.findByEmail(user.email)

    if (userFromDB) {
      const { userEmail, userName, userRol, userStatus, organizationId = null } = userFromDB
      dispatch(setCurrentUser({ userEmail, userName, userRol, userStatus, organizationId }))
    }
  }

  return { props: { initialReduxState: reduxStore.getState() } }
}
