import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Typography, Divider } from '@material-ui/core'

import { generateRadio } from './generate/Radio'
import { generateCheckbox } from './generate/Checkbox'
import { generateTextField } from './generate/Textfield'
import { generateQuickSubmitButton } from './generate/QuickSubmit'

export default function GenericHookForm(props) {
  const [globalDisable, setGlobalDisable] = useState(false)

  const { questionSetData, formFunctions } = props

  const { tagAsWater, skipImage, submitTags } = formFunctions
  console.log(tagAsWater, skipImage)
  const { questions } = questionSetData

  const {
    register,
    handleSubmit,
    errors,
    //watch,
    getValues,
    control,
    //setValue
  } = useForm({
    defaultValues: {
      ...generateRadioDefaults(questions),
    },
  })

  const onSubmit = (data) => {
    setGlobalDisable(true)
    submitTags(data)
  }

  function determineQuestionType(questionList) {
    return questionList.map((question) => {
      switch (question.type) {
        case 'radioGroup':
          return generateRadio(question, { globalDisable, control, errors })

        case 'checkboxGroup':
          return generateCheckbox(question, {
            globalDisable,
            register,
            getValues,
            errors,
          })

        case 'textField':
          return generateTextField(question, {
            globalDisable,
            register,
            errors,
          })

        case 'buttonSubmit':
          return generateQuickSubmitButton(question)

        default:
          break
      }
    })
  }

  return (
    <React.Fragment>
      <Typography color="secondary">
        {questionSetData.name}:{questionSetData.description}
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <React.Fragment>{determineQuestionType(questions)}</React.Fragment>
        </div>
        <Divider />
      </form>
    </React.Fragment>
  )
}

function generateRadioDefaults(input) {
  const defaults = {}

  input.map((question) => {
    if (question.type === 'radioGroup') {
      defaults[question.key] = ''
    }
  })
  return defaults
}
