import React, { ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
// import * as colors from '@material-ui/core/colors/';

interface Props extends CheckboxProps {
  children: ReactNode
  styles?: {
    border: string
    checked: string
  }
  otherProps?: any
}

export default function ColoredCheckbox(props: Props) {
  const { styles, children, ...otherProps } = props

  const StyledCheckboxButton = withStyles(() => ({
    root: {
      color: styles.border ?? '',
      '&$checked': {
        color: styles.checked ?? '',
      },
    },
    checked: {},
  }))(Checkbox)

  return <StyledCheckboxButton {...otherProps}>{children}</StyledCheckboxButton>
}
