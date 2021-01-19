import { auth0 } from 'lib/auth0'
import { handleDefault } from 'lib/apiUtils'
import * as projectModel from 'models/project'

const ALLOWED_METHODS = ['GET', 'POST']

async function handleGet (req, res) {
  const { query: { id } } = req
  const project = await projectModel.get(id)

  // TODO: Send the right status code according the operation result
  res.status(200).json(project)
}

async function handlePost (req, res) {
  const { query: { id }, body: { projectStatus } } = req
  await projectModel.updateProjectStatus(id, projectStatus)
  const project = await projectModel.get(id)

  // TODO: Send the right status code according the operation result
  res.status(200).json(project)
}

// TODO: Add authorization using Auth0
export default auth0.requireAuthentication(async function projectsHandler (req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGet(req, res)
    case 'POST':
      return handlePost(req, res)
    default:
      return handleDefault(req, res, ALLOWED_METHODS)
  }
})
