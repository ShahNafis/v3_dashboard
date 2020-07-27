/*
  Both _app.js and _document.js are on each page. This page gets the user and
  makes it so that its accessable in the whole program. I think it would be best
  to use useMemo for the user.
*/

import React from 'react'
import App, { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../components/theme'
// import axios from 'axios'
// import {
//   apiCall
// } from '../components/constants'
// import {getAllowedPages} from '../components/utils/getAllowedPages'
// import endpoints from '../components/endpoints'

interface PagePropsType {
  user?: any
}

export default class MyApp extends App<{}, {}, { user?: any }> {
  static async getInitialProps(context) {
    const { Component, ctx } = context
    let pageProps: PagePropsType = {}

    //Run the pages getInitProps first before _app.js
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    //If there is a passport session
    //added ctx.req.session for server side rendering
    if (ctx.req && ctx.req.session && ctx.req.session.passport) {
      //Then get the passport user
      pageProps.user = ctx?.req?.session?.passport?.user ?? {}

      //If there is a user,get role and check if in mongo
      // if(pageProps?.user?.id) {
      // }
    }

    return { pageProps }
  }

  constructor(props) {
    super(props)

    //Add user to state
    this.state = {
      user: props?.pageProps?.user ?? {},
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps }: AppProps = this.props

    return (
      <React.Fragment>
        <Head>
          <title>Coastal Image Labeler</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} user={this.state.user} />
        </ThemeProvider>
      </React.Fragment>
    )
  }
}
