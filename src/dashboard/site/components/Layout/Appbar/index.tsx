import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MoreIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { defaultTitle, navigationItems } from '../../Constants'

interface Props {
  title?: string
  user?: object
  showDrawer?: boolean
  appbarType: undefined | 'basic'
  handleDrawerToggle: () => void
  handleMenuToggle: () => void
}

function Appbar(props: Props) {
  const classes = useStyles()
  const { appbarType, showDrawer } = props
  const navItems = appbarType
    ? navigationItems[appbarType]
    : navigationItems['default']

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <Toolbar>
        {showDrawer && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={classes.showMobile}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap className={classes.title}>
          {props?.title || defaultTitle}
        </Typography>

        <div className={`${classes.title} ${classes.showDesktop}`}>
          {navItems.center.map((item, index) => {
            return (
              <React.Fragment key={index + item.name}>
                {item.element ? (
                  item.element
                ) : (
                  <Button
                    className={classes.spacedButton}
                    variant="outlined"
                    color="inherit"
                    href={item.route}
                  >
                    {item.name}
                  </Button>
                )}
              </React.Fragment>
            )
          })}
        </div>
        <div className={`${classes.showDesktop}`}>
          {navItems.right.map((item, index) => {
            return (
              <React.Fragment key={index + item.name}>
                {item.element ? (
                  item.element
                ) : (
                  <Button color="inherit" href={item.route}>
                    {item.name}
                  </Button>
                )}
              </React.Fragment>
            )
          })}
        </div>

        <div className={classes.showMobile}>
          <IconButton onClick={handleClick} color="inherit">
            <MoreIcon />
          </IconButton>
        </div>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {navItems.center.map((item, index) => {
            return (
              <div key={index + item.name}>
                <a
                  href={item.route}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItem button>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </a>
              </div>
            )
          })}
          {navItems.center.length > 0 && navItems.right.length > 0 && (
            <Divider />
          )}
          {navItems.right.map((item, index) => {
            return (
              <div key={index + item.name}>
                <a
                  href={item.route}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItem button>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </a>
              </div>
            )
          })}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  showDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  showMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  spacedButton: {
    marginRight: `5px`,
  },
}))

export default Appbar
