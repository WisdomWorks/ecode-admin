import { Dispatch, SetStateAction, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { TUser, useGetUsersByRole } from '@/api'
import { FileUpload } from '@/components/common'
import { FormInput, FormSelector } from '@/components/form'
import { FormButtonGroup } from '@/components/form/FormButtonGroup'
import { FormRadioGroup } from '@/components/form/FormRadioGroup'
import { Role } from '@/constants'
import { CreationOption } from '@/types'

import { TCourseCreationForm } from '../types'
import { Download } from '@mui/icons-material'
import { Button } from '@mui/material'

interface Props {
  files: FileList | null
  isPendingUploadFile?: boolean
  isUpdate?: boolean
  onCloseModalEdit?: () => void
  setFiles: Dispatch<SetStateAction<FileList | null>>
  studentsOnCourse?: TUser[] | null
}

export const CreateManuallyForm = ({
  files,
  isPendingUploadFile,
  isUpdate,
  onCloseModalEdit,
  setFiles,
  studentsOnCourse,
}: Props) => {
  const { control, reset, watch } = useFormContext<TCourseCreationForm>()
  const { data } = useGetUsersByRole({ role: Role.TEACHER })
  const { data: studentsData } = useGetUsersByRole({ role: Role.STUDENT })

  const students = useMemo(() => {
    if (!isUpdate) return studentsData

    return studentsData?.filter(
      student =>
        !studentsOnCourse?.some(
          studentOnCourse => studentOnCourse.userId === student.userId,
        ),
    )
  }, [isUpdate, studentsData, studentsOnCourse])

  return (
    <>
      <div className="col-span-12 grid grid-cols-12 gap-4">
        <FormInput
          className="col-span-4"
          control={control}
          label="Course name"
          name="courseName"
          placeholder="Fill the course name"
          required
        />
        <FormSelector
          className="col-span-4"
          control={control}
          filterSelectedOptions
          getOptionLabel={option =>
            typeof option === 'string' ? option : option.name
          }
          isOptionEqualToValue={(option, value) =>
            option.userId === value.userId
          }
          label="Teacher"
          name="teacher"
          options={data || []}
          placeholder="Select teacher"
          required
        />
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-4">
        <FormInput
          className="col-span-2"
          control={control}
          label="Semester"
          name="semester"
          placeholder="Fill the semester"
          required
        />
        <FormInput
          className="col-span-6"
          control={control}
          label="Description"
          maxRows={5}
          multiline
          name="description"
          placeholder="Fill the description"
          rows={3}
        />
      </div>

      <div className="col-span-12">
        <FormRadioGroup
          control={control}
          name="createStudentOption"
          options={[
            {
              value: CreationOption.Manually,
              label: isUpdate
                ? 'Update students manually'
                : 'Create students manually',
            },
            {
              value: CreationOption.Import,
              label: isUpdate
                ? 'Update students from excel'
                : 'Create students from excel',
            },
          ]}
        />
      </div>

      {watch('createStudentOption') === CreationOption.Manually && (
        <div className="col-span-12 grid grid-cols-12 gap-4">
          <FormSelector
            className="col-span-8"
            control={control}
            filterSelectedOptions
            getOptionLabel={option =>
              typeof option === 'string' ? option : option.name
            }
            isOptionEqualToValue={(option, value) =>
              option.userId === value.userId
            }
            label="Students"
            multiple
            name="students"
            options={students || []}
            placeholder="Select student"
          />
        </div>
      )}

      {watch('createStudentOption') === CreationOption.Import && (
        <div className="col-span-12 mt-8  grid grid-cols-2 divide-x divide-neutral-400">
          <div className="flex flex-col gap-2 pr-8">
            <FileUpload
              files={files}
              loading={isPendingUploadFile}
              setFiles={setFiles}
              typeFiles={['Excel']}
            />
          </div>
          <div className="flex flex-col gap-2 pl-8">
            <span className="text-lg font-bold text-neutral-900">
              Import Excel file guides
            </span>
            <p className="text-base font-normal text-neutral-800">
              Download the Excel template to simplify the import process. This
              file provides the necessary format for efficiently creating and
              importing multiple user accounts
            </p>
            <div>
              <Button
                className="submitBtn"
                startIcon={<Download fontSize="large" />}
              >
                Download template
              </Button>
            </div>
          </div>
        </div>
      )}

      <FormButtonGroup
        buttons={[
          {
            type: 'submit',
            label: isUpdate ? 'Cancel' : 'Clear',
            onClick: () => {
              if (isUpdate) return onCloseModalEdit?.()
              reset()
            },
            className: 'clearBtn',
          },
          {
            type: 'submit',
            label: isUpdate ? 'Update' : 'Create',
            className: 'submitBtn',
          },
        ]}
        className="col-span-12 justify-end"
      />
    </>
  )
}
