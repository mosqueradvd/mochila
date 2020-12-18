import React, { useEffect } from 'react'
import Link from 'next/link'
import Layout from 'components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrganizations } from '@dux/organizationsSlice'

export { getServerSideProps } from 'lib/ssr'

const Organizations = () => {
  const dispatch = useDispatch()
  const organizations = useSelector(state => state.organizations.data)
  useEffect(() => {
    dispatch(fetchOrganizations())
  }, [dispatch])

  return (
    <Layout pageTitle='Organizaciones'>
      <h1>Organizaciones</h1>
      <Link href='/organizations/new'>Nueva</Link>
      <ul>
        {organizations.map(({ _id, name }) => {
          return (
            <li key={name}>
              <Link
                href={`/organizations/${_id}`}
              >
                {name}
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Organizations
