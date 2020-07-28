import { Logout, Login } from '../Button/premadeButtons'

interface NavigationItemType {
  name: string
  icon?: string
  route?: string
  element?: JSX.Element
}

interface NavigationItemsType {
  default: {
    center?: NavigationItemType[]
    right?: NavigationItemType[]
  }
  basic: {
    center: NavigationItemType[]
    right: NavigationItemType[]
  }
}

const login = {
  name: 'Login',
  route: '/login',
  element: <Login href="/login" />,
}
const logout = {
  name: 'Logout',
  route: '/logout',
  element: <Logout href="/logout" />,
}
const home = {
  name: 'Home',
  icon: '',
  route: '/auth/home',
}
const startTagging = {
  name: 'Start Tagging',
  icon: '',
  route: '/auth/startTagging',
}

const navigation: NavigationItemsType = {
  default: {
    center: [],
    right: [login],
  },
  basic: {
    center: [home, startTagging],
    right: [logout],
  },
}

export default navigation
