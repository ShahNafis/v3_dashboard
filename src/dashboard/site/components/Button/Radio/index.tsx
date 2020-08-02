import React, { ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio, { RadioProps } from '@material-ui/core/Radio'
// import * as colors from '@material-ui/core/colors/';

interface Props extends RadioProps {
  children?: ReactNode
  styles?: {
    circle: string
    checked: string
  }
  otherProps?: any
}

export default function ColoredRadio(props: Props) {
  const { styles, children, ...otherProps } = props

  const StyledRadioButton = withStyles(() => ({
    root: {
      color: styles.circle ?? '',
      '&$checked': {
        color: styles.checked ?? '',
      },
    },
    checked: {},
  }))(Radio)

  return <StyledRadioButton {...otherProps}>{children}</StyledRadioButton>
}
