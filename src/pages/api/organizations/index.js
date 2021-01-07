import { handleDefault } from 'lib/apiUtils'
import * as organizationModel from 'models/organization'
import * as userModel from 'models/user'

const ALLOWED_METHODS = ['GET', 'POST']

async function handleGet (req, res) {
  const organizations = await organizationModel.findAll()

  // TODO: Send the right status code according the operation result
  res.status(200).json(organizations)
}

async function handlePost (req, res) {
  const { body } = req
  let { organization, owner } = JSON.parse(body)
  const { insertedId: organizationId } = await organizationModel.create(organization)
  await userModel.create({ ...owner, organizationId })

  organization = await organizationModel.get(organizationId)

  // TODO: Send the right status code according the operation result
  res.status(200).json(organization)
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
