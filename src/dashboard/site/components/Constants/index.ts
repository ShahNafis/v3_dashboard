import { navigationItems } from './navigation'
const protocal = process?.env?.NEXT_PUBLIC_PROTOCOL
const apiCall = (route) => {
  return `${protocal}://${process?.env?.NEXT_PUBLIC_DOMAIN_NAME}${route}`
  //return `${route}`
}
const routes = {
  postReq: {
    getUser: apiCall('/api/user/getUser'),
    getResumeTableData: apiCall('/api/catalog/userCatalogs'),
  },
}
const uiConstants = {
  drawerWidth: 240,
}

const defaultTitle = 'Coastal Image Labeler'

export { protocal, apiCall, uiConstants, navigationItems, defaultTitle, routes }
