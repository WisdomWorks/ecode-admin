import { Control } from 'react-hook-form'

import { FormInput } from '@/components/form'
import { FormButtonGroup } from '@/components/form/FormButtonGroup'

import { TCourseCreationForm } from '../types'

interface Props {
  control: Control<TCourseCreationForm>
  isUpdate?: boolean
  onCloseModalEdit?: () => void
  reset: () => void
}

export const CreateManuallyForm = ({
  control,
  isUpdate,
  onCloseModalEdit,
  reset,
}: Props) => {
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
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-4">
        <FormInput
          className="col-span-4"
          control={control}
          label="Description"
          name="description"
          placeholder="Fill the description"
          required
        />
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-4">
        <FormInput
          className="col-span-4"
          control={control}
          label="Semester"
          name="semester"
          placeholder="Fill the semester"
          required
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
