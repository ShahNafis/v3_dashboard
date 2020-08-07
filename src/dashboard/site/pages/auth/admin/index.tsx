import React from 'react'

import Head from 'next/head'
import { GetServerSideProps } from 'next'

import getSession from '../../../components/Utils/Auth/getSession'
import { getUserDB } from '../../../components/API/getUserDB'
import Layout from '../../../components/Layout'
import { checkUserTags } from '../../../components/Utils/Auth/checkTags'
import { generateUnAuthObj } from '../../../components/Utils/Auth/unAuthError'
import ErrorCard from '../../../components/ErrorCards'
import { determineNavItems } from '../../../components/Utils/Auth/determineNavItems'

export const Admin = (props): JSX.Element => {
  const { user, success, message } = props

  return (
    <div className="container">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        showDrawer
        user={props.user}
        navItems={determineNavItems(user)}
        title={`Welcome ${user?.displayName}`}
      >
        {!success ? (
          <ErrorCard message={message} title="Error" />
        ) : (
          <React.Fragment>
            Running on port {process.env.NEXT_PUBLIC_PORT} in{' '}
            {process.env.NEXT_PUBLIC_NODE_ENV} mode.
            <br />
            Admin: {user.displayName}
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

  const isAdmin = checkUserTags({ roles: user.data?.roles, role: 'admin' })

  if (!isAdmin.success) {
    return {
      props: {
        ...generateUnAuthObj({
          message: `User ${user.data.userName} is not allowed to access this page`,
        }),
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

export default Admin
