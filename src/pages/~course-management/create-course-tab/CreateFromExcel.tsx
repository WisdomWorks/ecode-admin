import { useState } from 'react'

import { useImportCourses } from '@/api'
import { FileUpload } from '@/components/common'
import { useToastMessage } from '@/hooks'

import { Download } from '@mui/icons-material'
import { Button } from '@mui/material'
export const CreateFromExcel = () => {
  const { isPending, mutate } = useImportCourses()
  const [files, setFiles] = useState<FileList | null>(null)
  const { setErrorMessage, setSuccessMessage } = useToastMessage()

  const handleUpload = async () => {
    if (files) {
      const formData = new FormData()
      formData.append('file', files[0])
      mutate(formData, {
        onError: () => {
          setErrorMessage(
            'Failed to import courses. Please check the file and try again',
          )
        },
        onSuccess: () => {
          setSuccessMessage('Courses imported successfully')
          setFiles(null)
        },
      })
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
          loading={isPending}
          multiple
          setFiles={setFiles}
          typeFiles={['Excel']}
        />
      </div>
      <div className="flex flex-col gap-2 pl-8">
        <span className="text-2xl font-bold text-neutral-900">
          Import Excel file guides
        </span>
        <div>
          <h3>Please fill in the excel file in the format:</h3>
          <ul>
            <li>
              <p>1. Column A is the Course name</p>
            </li>
            <li>
              <p>2. Column B is the semester with exactly 4 characters</p>
            </li>
            <li>
              <p>3. Column C is course description</p>
            </li>
          </ul>
          <h5>
            The system will not import if the file is not in the correct format
          </h5>
          <h5>Click the button below to get the template</h5>
        </div>
        <div>
          <a
            href="https://storage.googleapis.com/codee-data/templates/Create_Course_Template.xlsx"
            rel="noreferrer"
            target="_self"
          >
            <Button
              className="submitBtn"
              startIcon={<Download fontSize="large" />}
            >
              Download template
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
