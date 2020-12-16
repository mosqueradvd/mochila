import { handleDefault } from 'lib/apiUtils'
import * as typesDocumentsModel from 'models/typesDocuments'

const ALLOWED_METHODS = ['GET']

async function handleGet (req, res) {
  const typesDocuments = await typesDocumentsModel.findAll()

  // TODO: Send the right status code according the operation result
  res.status(200).json(typesDocuments)
}

// TODO: Add authorization using Auth0
export default async function handler (req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGet(req, res)
    default:
      return handleDefault(req, res, ALLOWED_METHODS)
  }
}
