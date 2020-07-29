import { withStyles } from '@material-ui/core/styles'
// import theme from '../theme';
// import * as colors from '@material-ui/core/colors/';
import Button from '@material-ui/core/Button'

export default function ColoredButton(props) {
  const {
    textColor,
    backgroundColor,
    borderColor,

    hoverTextColor,
    hoverBackgroundColor,
    hoverBorderColor,

    disabledTextColor,
    disabledBackgroundColor,
    disabledBorderColor,

    children,
    ...otherProps
  } = props
  const StyledButton = withStyles(() => ({
    root: {
      color: textColor,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      '&:hover': {
        color: hoverTextColor,
        backgroundColor: hoverBackgroundColor,
        borderColor: hoverBorderColor,
      },
      '&:disabled': {
        color: disabledTextColor ?? '#000000',
        backgroundColor: disabledBackgroundColor ?? 'grey',
        borderColor: disabledBorderColor ?? 'white',
      },
    },
  }))(Button)

  return <StyledButton {...otherProps}>{children}</StyledButton>
}
