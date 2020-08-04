import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/getUserDB'
import Avatar from '@material-ui/core/Avatar'
import ErrorCard from '../../components/ErrorCards'
import { determineAppbar } from '../../components/Utils/Auth/determineAppbar'
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
            Hello {user?.displayName}|{user.data._id}
            <Avatar alt="hi" src={user.picture} />
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
