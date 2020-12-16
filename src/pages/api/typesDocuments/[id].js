import { handleDefault } from 'lib/apiUtils'
import * as organizationModel from 'models/organization'

const ALLOWED_METHODS = ['GET', 'POST', 'DELETE']

async function handleGet (req, res) {
  const { query: { id } } = req
  const organization = await organizationModel.get(id)

  // TODO: Send the right status code according the operation result
  res.status(200).json(organization)
}

async function handlePost (req, res) {
  const { query: { id }, body } = req
  const attributes = JSON.parse(body)
  await organizationModel.update(id, attributes)
  const organization = await organizationModel.get(id)

  // TODO: Send the right status code according the operation result
  res.status(200).json(organization)
}

async function handleDelete (req, res) {
  const { query: { id } } = req
  const result = await organizationModel.remove(id)
  const success = result.deletedCount === 1

  // TODO: Send the right status code according the operation result
  res.status(200).json({ success })
}

// TODO: Add authorization using Auth0
export default async function organizationsHandler (req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGet(req, res)
    case 'POST':
      return handlePost(req, res)
    case 'DELETE':
      return handleDelete(req, res)
    default:
      return handleDefault(req, res, ALLOWED_METHODS)
  }
}
