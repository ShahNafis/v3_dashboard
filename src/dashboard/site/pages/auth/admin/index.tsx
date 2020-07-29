import Head from 'next/head'
import { GetServerSideProps } from 'next'

import getSession from '../../../components/Utils/Auth/getSession'
import { getUserDB } from '../../../components/API/getUserDB'
import Layout from '../../../components/Layout'
export const Admin = (props): JSX.Element => {
  const { user } = props
  return (
    <div className="container">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        showDrawer
        user={props.user}
        appbarType="basic"
        title={`Welcome ${user.displayName}`}
      >
        Admin: {user.displayName}
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

  return {
    props: {
      user,
    },
  }
}

export default Admin
