import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { defaultTitle, navigationItems } from '../../Constants'

interface Props {
  title?: string
  user?: object
  appbarType: undefined | 'basic'
  handleDrawerToggle: () => void
}

function Appbar(props: Props) {
  const classes = useStyles()
  const { appbarType } = props
  const navItems = appbarType
    ? navigationItems[appbarType]
    : navigationItems['default']
  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          {props?.title || defaultTitle}
        </Typography>
        <div className={classes.title}>
          {navItems.center.map((item, index) => {
            return (
              <React.Fragment key={index + item.name}>
                <Button
                  className={classes.spacedButton}
                  variant="outlined"
                  color="inherit"
                  href={item.route}
                >
                  {item.name}
                </Button>
              </React.Fragment>
            )
          })}
        </div>
        {navItems.right.map((item, index) => {
          return (
            <Button key={index + item.name} color="inherit" href={item.route}>
              {item.name}
            </Button>
          )
        })}
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
