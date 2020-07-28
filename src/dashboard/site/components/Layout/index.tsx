import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

import Appbar from './Appbar'
import MobileDrawer from './Drawer/mobile'
import DesktopDrawer from './Drawer/desktop'
import { uiConstants } from '../Constants'

const drawerWidth = uiConstants.drawerWidth

interface Props {
  title?: string
  user?: object
  showDrawer?: boolean
  children: ReactNode
  appbarType?: undefined | 'basic'
}

function Layout(props: Props) {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const {
    title,
    //user,
    showDrawer,
    appbarType,
  } = props

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar
        title={title}
        handleDrawerToggle={handleDrawerToggle}
        appbarType={appbarType}
      />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {showDrawer && (
          <React.Fragment>
            {/* Phone mode */}
            <MobileDrawer
              handleDrawerToggle={handleDrawerToggle}
              mobileOpen={mobileOpen}
            ></MobileDrawer>

            {/* Desktop mode */}
            <DesktopDrawer></DesktopDrawer>
          </React.Fragment>
        )}
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export default Layout
