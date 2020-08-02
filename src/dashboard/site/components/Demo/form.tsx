import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function CheckboxesGroup() {
  const defaultNames = ['bill', 'Manos']
  const { control, handleSubmit, watch } = useForm({
    //defaultValues: { names: defaultNames }
  })

  const [checkedValues, setCheckedValues] = useState(defaultNames)

  function handleSelect(checkedName) {
    const newNames = checkedValues?.includes(checkedName)
      ? checkedValues?.filter((name) => name !== checkedName)
      : [...(checkedValues ?? []), checkedName]
    setCheckedValues(newNames)
    return newNames
  }

  return (
    <form onSubmit={handleSubmit((e) => console.log(e))}>
      {JSON.stringify(watch())}
      {['bill', 'luo', 'Manos', 'user120242'].map((name) => (
        <FormControlLabel
          control={
            <Controller
              as={<Checkbox />}
              control={control}
              checked={checkedValues.includes(name)}
              name="names"
              onChange={() => handleSelect(name)}
            />
          }
          key={name}
          label={name}
        />
      ))}
      <button>Submit</button>
    </form>
  )
}
