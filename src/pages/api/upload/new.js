import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import { AWS_ACCESS_KEY_ID, AWS_S3_UPLOADS_BUCKET, AWS_S3_UPLOADS_REGION, AWS_SECRET_ACCESS_KEY } from 'lib/config'

const s3 = new AWS.S3()
AWS.config.update({ accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY })

AWS.config.update({ region: AWS_S3_UPLOADS_REGION })
const signedUrlExpireSeconds = 60 * 5

export default async function handler (req, res) {
  try {
    const { query: { fileName, contentType } } = req
    const uploadId = uuidv4()
    const key = `files/${uploadId}/${fileName}`

    const signedUrl = s3.getSignedUrl('putObject', {
      Bucket: AWS_S3_UPLOADS_BUCKET,
      Key: key,
      ContentType: contentType,
      ACL: 'public-read',
      Expires: signedUrlExpireSeconds
    })

    const unsignedUrl = `https://${AWS_S3_UPLOADS_BUCKET}.s3.amazonaws.com/${key}`

    res.status(200).json({ signedUrl, unsignedUrl })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
