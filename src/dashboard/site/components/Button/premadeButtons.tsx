import ColoredButton from './coloredButton'
import theme from '../theme'

function Logout(props) {
  return (
    <ColoredButton
      textColor="red"
      //backgroundColor='white'
      borderColor="red"
      hoverBackgroundColor="red"
      hoverTextColor="white"
      variant="outlined"
      {...props}
    >
      Logout
    </ColoredButton>
  )
}

function Login(props) {
  return (
    <ColoredButton
      textColor={theme.palette.secondary.main}
      //backgroundColor='white'
      borderColor={theme.palette.secondary.main}
      //hoverBackgroundColor="red"
      //hoverTextColor="white"
      variant="outlined"
      {...props}
    >
      Login
    </ColoredButton>
  )
}

export { Logout, Login }
