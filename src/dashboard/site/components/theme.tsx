// The file that contains the theme of the site

import { createMuiTheme } from '@material-ui/core/styles'
//import { red } from '@material-ui/core/colors';

//https://colorpalettes.net/color-palette-927/
//https://colorpalettes.net/color-palette-1539/

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto Mono',
      //'Roboto'
    ].join(','),
  },
  palette: {
    //type:'dark',
    // primary: {
    //   main: '#4A6810',
    //   light:'#97B55D'
    // },
    // secondary:{
    //   main:'#ffe59e'
    // },
    // error: {
    //   main: red.A400,
    // },
    // background: {
    //   default:'#1B5465',
    //   paper:'#002E3F' //darken 10%
    // },
    // text:{
    //   primary:`#E1DBD0`
    // }
  },
})

export default theme
