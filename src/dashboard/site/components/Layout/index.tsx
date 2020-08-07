import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Appbar from './Appbar'
import MobileDrawer from './Drawer/mobile'
import DesktopDrawer from './Drawer/desktop'
import { uiConstants,navigationItems } from '../Constants'

const drawerWidth = uiConstants.drawerWidth

interface Props {
  title?: string
  user?: object
  drawer?: {
    content: any
  }
  children: ReactNode
  navItems?: any
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
    drawer,
    navItems
  } = props
  console.log(!!drawer)
  const classes = genUseStyle({ showDrawer:!!drawer  })()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar
        title={title}
        drawer={{
          showDrawer: !!drawer,
          handleDrawerToggle:handleDrawerToggle,
          handleMenuToggle:handleMenuToggle
        }}
        navItems = {navItems ?? navigationItems.default}
      />
      
      <nav className={classes.drawer} aria-label="mailbox folders">
        {!!drawer && (
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
