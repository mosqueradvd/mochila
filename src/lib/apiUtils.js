export async function handleDefault (req, res, allowedMethods = []) {
  const { method } = req
  res.setHeader('Allow', allowedMethods)
  res.status(405).end(`Method ${method} Not Allowed`)
}
