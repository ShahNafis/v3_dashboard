import colors from 'colors'
colors

function log({ message, type }) {
  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
    switch (type) {
      case 'info':
        console.log(message.cyan)
        break
      case 'ok':
        console.log(message.green)
        break
      case 'error':
        console.log(message.red)
        break
      default:
        console.log(message)
        break
    }
  }
}

export { log }
