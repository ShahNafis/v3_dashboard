import React from 'react'
import Head from 'next/head'
import { Typography, Paper } from '@material-ui/core'

import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/getUserDB'
import ErrorCard from '../../components/ErrorCards'
import { determineAppbar } from '../../components/Utils/Auth/determineAppbar'

import { EmailLink, RepoLink, DocLink } from '../../components/ColoredLink'

export const Home = (props): JSX.Element => {
  const { user, success, message } = props
  return (
    <div className="container">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        user={props.user}
        appbarType={determineAppbar(props.user)}
        title={`Welcome ${user?.displayName}`}
      >
        {!success ? (
          <ErrorCard message={message} title="Error" />
        ) : (
          <React.Fragment>
            <Typography variant="body1" component="h1" gutterBottom>
              <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
                Welcome {props.user.displayName}! If you have permission to
                label images, you can start by clicking &quot;Pick Catalog to
                Label&quot; on the left, or resume labeling a catalog you have
                started using the table below. To request permission to label
                images, please contact Evan Goldstein at {<EmailLink />}. Also,
                please check out the project {<RepoLink />} and the project{' '}
                {<DocLink />}.
              </Paper>
            </Typography>
          </React.Fragment>
        )}
      </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const user: any = getSession(context.req)
  user.data = await getUserDB({
    cookie: context?.req?.headers?.cookie,
    res: context.res,
  })

  if (Object.keys(user.data).length === 0) {
    return {
      props: {
        success: false,
        message: 'Error getting User data',
      },
    }
  }
  return {
    props: {
      success: true,
      user,
    },
  }
}

export default Home
