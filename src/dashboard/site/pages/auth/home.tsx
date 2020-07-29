import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/getUserDB'
import Avatar from '@material-ui/core/Avatar'

export const Home = (props): JSX.Element => {
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
        title={`Welcome ${user?.displayName}`}
      >
        Hello {user?.displayName}|{user.data._id}
        <Avatar alt="hi" src={user.picture} />
      </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const user: any = getSession(context.req)
  user.data = await getUserDB(context?.req?.headers?.cookie)

  return {
    props: {
      user,
    },
  }
}

export default Home
