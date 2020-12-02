export default function organizationsHandler (req, res) {
  const {
    query: { id },
    body,
    method
  } = req

  switch (method) {
    case 'GET':
      // Get data from the database
      res.status(200).json({ id, name: `Organization ${id}` })
      break
    case 'POST':
      // Update or create data in the database
      res.status(200).json({ id, ...body })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
