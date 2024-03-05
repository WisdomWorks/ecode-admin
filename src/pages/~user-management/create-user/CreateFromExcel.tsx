import { useState } from 'react'

import { useImportUsers } from '@/api/useImportUsers'
import { FileUpload } from '@/components/common'

import { Download } from '@mui/icons-material'
import { Button } from '@mui/material'
export const CreateFromExcel = () => {
  const { mutate } = useImportUsers()
  const [files, setFiles] = useState<FileList | null>(null)

  const handleUpload = async () => {
    if (files) {
      const formData = new FormData()
      formData.append('file', files[0])
      mutate(formData)
    }
  }

  return (
    <div className="col-span-12 mt-8  grid grid-cols-2 divide-x divide-neutral-400">
      <div className="flex flex-col gap-2 pr-8">
        <span className="text-2xl font-bold text-neutral-900">
          Upload files
        </span>
        <FileUpload
          files={files}
          handleUpload={handleUpload}
          multiple
          setFiles={setFiles}
        />
      </div>
      <div className="flex flex-col gap-2 pl-8">
        <span className="text-2xl font-bold text-neutral-900">
          Import Excel file guides
        </span>
        <p className="text-lg font-normal text-neutral-800">
          Download the Excel template to simplify the import process. This file
          provides the necessary format for efficiently creating and importing
          multiple user accounts
        </p>
        <div>
          {/* <a href={require('@/assets/templates/')}> */}
          <Button
            className="submitBtn"
            startIcon={<Download fontSize="large" />}
          >
            Download template
          </Button>
          {/* </a> */}
        </div>
      </div>
    </div>
  )
}
