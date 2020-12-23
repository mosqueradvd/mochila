import React, { useEffect } from 'react'
import Link from 'next/link'
import Layout from 'components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '@dux/usersSlice'
export { getServerSideProps } from 'lib/ssr'

const RegisterUSers = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.data)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <Layout pageTitle='registo de usuarios'>
      <h1>Usuarios</h1>
      <Link href='/users/new'>Nueva</Link>

      <ul>
        {users.map(({ _id, userName }) => {
          return (
            <li key={userName}>
              <Link
                href={`/users/${_id}`}
              >
                {userName}
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default RegisterUSers
