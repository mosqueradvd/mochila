import { handleDefault } from 'lib/apiUtils'
import * as projectModel from 'models/project'

const ALLOWED_METHODS = ['GET', 'POST']

async function handleGet (req, res) {
  const projects = await projectModel.findAll()

  // TODO: Send the right status code according the operation result
  res.status(200).json(projects)
}

async function handlePost (req, res) {
  const { body } = req
  const attributes = JSON.parse(body)
  const { insertedId: id } = await projectModel.create(attributes)
  const project = await projectModel.get(id)

  // TODO: Send the right status code according the operation result
  res.status(200).json(project)
}

// TODO: Add authorization using Auth0
export default async function handler (req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGet(req, res)
    case 'POST':
      return handlePost(req, res)
    default:
      return handleDefault(req, res, ALLOWED_METHODS)
  }
}
