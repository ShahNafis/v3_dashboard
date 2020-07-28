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

export default class MyApp extends App<{}, {}, { user?: any }> {
  constructor(props) {
    super(props)
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
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    )
  }
}
