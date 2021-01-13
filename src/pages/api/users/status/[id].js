import { handleDefault } from 'lib/apiUtils'
import * as userModel from 'models/user'

const ALLOWED_METHODS = ['GET', 'POST']

async function handleGet (req, res) {
  const { query: { id } } = req
  const user = await userModel.get(id)
  // TODO: Send the right status code according the operation result
  res.status(200).json(user)
}

async function handlePost (req, res) {
  const { query: { id }, body: attributes } = req
  await userModel.updateUserStatus(id, attributes)
  const user = await userModel.get(id)

  // TODO: Send the right status code according the operation result
  res.status(200).json(user)
}

// TODO: Add authorization using Auth0
export default async function usersHandler (req, res) {
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
