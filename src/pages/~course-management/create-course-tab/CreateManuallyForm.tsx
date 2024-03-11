import { useMemo } from 'react'
import { Control } from 'react-hook-form'

import { TUser, useGetUsersByRole } from '@/api'
import { FormInput, FormSelector } from '@/components/form'
import { FormButtonGroup } from '@/components/form/FormButtonGroup'
import { Role } from '@/constants'

import { TCourseCreationForm } from '../types'

interface Props {
  control: Control<TCourseCreationForm>
  isUpdate?: boolean
  onCloseModalEdit?: () => void
  reset: () => void
  studentsOnCourse?: TUser[] | null
}

export const CreateManuallyForm = ({
  control,
  isUpdate,
  onCloseModalEdit,
  reset,
  studentsOnCourse,
}: Props) => {
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
          name="description"
          placeholder="Fill the description"
        />
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-4">
        <FormSelector
          className="col-span-9"
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
