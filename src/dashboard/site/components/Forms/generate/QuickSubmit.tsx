import { FormControl, FormLabel, FormGroup } from '@material-ui/core'
import { generateLabel } from './Label'

function generateQuickSubmitButton(buttonQuestions) {
  const { label, key, docLink, buttons } = buttonQuestions

  return (
    <FormControl fullWidth component="fieldset" margin="normal" key={key}>
      <FormLabel component="legend" focused={false}>
        {generateLabel({ label, link: docLink })}
      </FormLabel>
      <FormGroup row>
        {buttons.map((buttonData) => {
          const {
            // label:buttonLabel,
            // tag,
            key: buttonKey,
          } = buttonData
          return <div key={buttonKey}>Water</div>
        })}
      </FormGroup>
    </FormControl>
  )
}

export { generateQuickSubmitButton }
