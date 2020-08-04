import { Logout, Login } from '../Button/premadeButtons'

interface NavigationItemType {
  name: string
  route: string
  icon?: string
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
  admin: {
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
const admin = {
  name: 'Admin',
  icon: '',
  route: '/auth/admin',
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
  admin: {
    center: [home, startTagging, admin],
    right: [logout],
  },
}

export default navigation
