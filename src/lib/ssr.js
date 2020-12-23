import { setCurrentUser } from '@dux/loginSlice'
import { initializeStore } from 'dux/store'
import { getCurrentUser } from './auth0'

export async function getServerSideProps ({ req, res }) {
  const user = await getCurrentUser(req)

  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  if (user) {
    dispatch(setCurrentUser(user))
  }

  return { props: { initialReduxState: reduxStore.getState() } }
}
