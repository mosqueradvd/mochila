const organizations = [
  { id: 1, name: 'Foo' },
  { id: 2, name: 'Bar' }
]

export default function handler (req, res) {
  const {
    method,
    body
  } = req

  switch (method) {
    case 'GET':
      // Get data from the database
      res.status(200).json(organizations)
      break
    case 'POST':
      // Update or create data in the database
      res.status(200).json({ id: 20, ...body })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
