import ColoredButton from './coloredButton'

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
      textColor="yellow"
      //backgroundColor='white'
      borderColor="red"
      hoverBackgroundColor="red"
      hoverTextColor="white"
      variant="outlined"
      {...props}
    >
      Login
    </ColoredButton>
  )
}

export { Logout, Login }
