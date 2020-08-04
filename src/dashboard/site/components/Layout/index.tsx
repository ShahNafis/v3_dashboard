import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
  appbarType?: undefined | 'basic' | 'admin'
}

function Layout(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const {
    title,
    //user,
    showDrawer,
    appbarType,
  } = props

  const classes = genUseStyle({ showDrawer })()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar
        title={title}
        handleDrawerToggle={handleDrawerToggle}
        handleMenuToggle={handleMenuToggle}
        appbarType={appbarType}
        showDrawer={showDrawer}
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
        <Container>{props.children}</Container>
      </main>
    </div>
  )
}

function genUseStyle({ showDrawer }) {
  return makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: showDrawer ? drawerWidth : 0,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: showDrawer ? drawerWidth : 0,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }))
}

export default Layout
