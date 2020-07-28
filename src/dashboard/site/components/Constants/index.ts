import navigationItems from './navigation'
const protocal = process?.env?.NEXT_PUBLIC_PROTOCOL
const apiCall = (route) => {
  return `${protocal}://${process?.env?.NEXT_PUBLIC_API_URL}${route}`
  //return `${route}`
}

const uiConstants = {
  drawerWidth: 240,
}

const defaultTitle = 'Coastal Image Labeler'

export { protocal, apiCall, uiConstants, navigationItems, defaultTitle }
