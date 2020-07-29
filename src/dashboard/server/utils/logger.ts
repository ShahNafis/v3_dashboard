import colors from 'colors'
colors

interface LogType {
  message?: string
  type?: '' | 'info' | 'ok' | 'error'
}

function log({ message = '', type = '' }: LogType) {
  if (!message) {
    message = ''
  }
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
  } else {
    console.log(message)
  }
}

export { log }
