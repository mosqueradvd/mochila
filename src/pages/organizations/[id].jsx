import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchOrganizationById } from '@dux/organizationsSlice'
import Layout from 'components/Layout'
export { getServerSideProps } from 'lib/ssr'

const Organization = () => {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.organizations.isLoading)
  const organization = useSelector(state => state.organizations.current)

  useEffect(() => {
    dispatch(fetchOrganizationById(id))
  }, [dispatch, id])

  return (
    <Layout pageTitle={`Organización | ${organization?.name}`}>
      {isLoading ? <p>Is Loading...</p> : <h1>{`Organización: ${organization?.name}`}</h1>}
    </Layout>
  )
}

export default Organization
