import { ObjectId } from 'mongodb'
import { connectToDatabase } from 'lib/mongodb'

const COLLECTION_NAME = 'organizations'

async function getCollection () {
  const { db } = await connectToDatabase()
  return db.collection(COLLECTION_NAME)
}

export async function findAll () {
  const collection = await getCollection()

  return collection.find({}).limit(1000).toArray()
}

export async function create ({
  name, identificationNumber, legalRepresentative, identificationType, identification, phone, email,
  departament, city, community, attached
}) {
  const collection = await getCollection()
  const document = {
    name,
    identificationNumber,
    legalRepresentative,
    identificationType,
    identification,
    phone,
    email,
    departament,
    city,
    community,
    attached
  }

  return await collection.insertOne(document)
}

export async function get (id) {
  const collection = await getCollection()

  return collection.findOne({ _id: ObjectId(id) })
}

export async function update (id, attributes) {
  const collection = await getCollection()
  const filter = { _id: ObjectId(id) }
  const updateDocument = { $set: { ...attributes } }

  return await collection.updateOne(filter, updateDocument)
}

export async function remove (id) {
  const collection = await getCollection()
  const filter = { _id: ObjectId(id) }

  return await collection.deleteOne(filter)
}
