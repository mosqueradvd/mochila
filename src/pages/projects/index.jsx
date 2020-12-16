import React, { useEffect } from 'react'
import Link from 'next/link'
import Layout from 'components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '@dux/projectsSlice'
export { getServerSideProps } from 'lib/ssr'

const Projects = () => {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects.data)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  return (
    <Layout pageTitle='Proyectos'>
      <h1>Proyectos</h1>
      <Link href='/projects/new'>Nueva</Link>
      <ul>
        {projects.map(({ _id, name }) => {
          return (
            <li key={name}>
              <Link
                href={`/projects/${_id}`}
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

export default Projects
