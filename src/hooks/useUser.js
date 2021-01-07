import { useSelector } from 'react-redux'
import { getCurrentUser } from 'dux/loginSlice'

export default function useUser () {
  const user = useSelector(getCurrentUser)
  return user
}
