import ColoredCheckboxButtons from './index'
import * as colors from '@material-ui/core/colors/'

function YesNoCheckbox(props) {
  return (
    <ColoredCheckboxButtons
      styles={{
        checked: colors.green[600],
        border: colors.red[400],
      }}
      {...props}
    />
  )
}

export { YesNoCheckbox }
