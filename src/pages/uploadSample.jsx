import React, { useState } from 'react'
import FileUploader from 'components/FileUploader'

const UploadSample = () => {
  const [file, setFile] = useState()

  const handleOnChange = (newFile) => {
    setFile(newFile)
  }

  return (
    <>
      <FileUploader filePrefix='test' onChange={handleOnChange} />
      {file && (
        <a
          href={file}
          target='_blank'
          rel='noreferrer'
        >
          {file}
        </a>
      )}
    </>
  )
}

export default UploadSample
