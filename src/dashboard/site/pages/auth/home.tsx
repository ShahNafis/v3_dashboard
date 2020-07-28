import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

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
        Hello {user?.displayName}
        <Avatar alt="hi" src={user.picture} />
        <div>
          <Button variant="contained">Default</Button>
          <Button variant="outlined">Default</Button>
          <Button variant="text">Default</Button>
        </div>
      </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const user = getSession(context.req)
  return {
    props: {
      user,
    },
  }
}

export default Home
