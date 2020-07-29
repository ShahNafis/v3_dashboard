import { FunctionComponent } from 'react'

interface Props {
  href: string
  style: object
}

export const ColoredLink: FunctionComponent<Props> = (props) => {
  return (
    <a style={props.style} href={props.href}>
      {props.children}
    </a>
  )
}

export default ColoredLink
