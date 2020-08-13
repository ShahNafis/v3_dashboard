// import ColoredButton from './coloredButton'
import {
  //theme,
  customColors,
} from '../theme'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import * as Colors from '@material-ui/core/colors'

const LogoutTheme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.red[400],
    },
  },
})
function Logout(props) {
  return (
    <ThemeProvider theme={LogoutTheme}>
      <Button variant="contained" color="primary" {...props}>
        Logout
      </Button>
    </ThemeProvider>
  )
}

function Login(props) {
  return (
    <Button variant="outlined" color="secondary" {...props}>
      Login
    </Button>
  )
}

const CyanButtonTheme = createMuiTheme({
  palette: {
    primary: {
      main: customColors.cyan,
    },
  },
})
function CyanButton(props) {
  return (
    <ThemeProvider theme={CyanButtonTheme}>
      <Button variant="contained" color="primary" {...props}>
        {props.children}
      </Button>
    </ThemeProvider>
  )
}

const SkipButtonTheme = createMuiTheme({
  palette: {
    primary: {
      main: customColors.yellow,
    },
  },
})
function SkipButton(props) {
  return (
    <ThemeProvider theme={SkipButtonTheme}>
      <Button variant="contained" color="primary" {...props}>
        {props.children}
      </Button>
    </ThemeProvider>
  )
}

const SubmitButtonTheme = createMuiTheme({
  palette: {
    primary: {
      main: customColors.green,
    },
  },
})
function SubmitButton(props) {
  return (
    <ThemeProvider theme={SubmitButtonTheme}>
      <Button variant="contained" color="primary" {...props}>
        {props.children}
      </Button>
    </ThemeProvider>
  )
}

const ViewImageTheme = createMuiTheme({
  palette: {
    primary: {
      main: customColors.orange,
    },
  },
})
function ViewImage(props) {
  return (
    <ThemeProvider theme={ViewImageTheme}>
      <Button variant="contained" color="primary" {...props}>
        {props.children}
      </Button>
    </ThemeProvider>
  )
}

export { Logout, Login, CyanButton, SkipButton, SubmitButton, ViewImage }
