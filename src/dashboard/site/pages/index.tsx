import React from 'react'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Layout from '../components/Layout'
import ColoredLink from '../components/ColoredLink'
import theme from '../components/theme'

const RepoLink = () => (
  <ColoredLink
    style={{ color: theme.palette.secondary.main }}
    href="https://github.com/UNCG-DAISY/Coastal-Image-Labeler"
  >
    here
  </ColoredLink>
)

const EmailLink = () => (
  <ColoredLink
    style={{ color: theme.palette.secondary.main }}
    href="mailto:ebgoldst@uncg.edu"
  >
    ebgoldst@uncg.edu
  </ColoredLink>
)

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Welcome to Coastal Image Labeler</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <Container>
        Running on port {process.env.NEXT_PUBLIC_PORT} in{' '}
        {process.env.NEXT_PUBLIC_NODE_ENV} mode.
        <Box my={4}>
          <Typography paragraph>
            <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
              Welcome to Coastal Image Labeler, please login. You can read about
              the project <RepoLink />. If you have questions, please contact
              Evan Goldstein:
              <EmailLink />.
            </Paper>
          </Typography>
        </Box>
      </Container>
    </Layout>
  </div>
)

export default Home