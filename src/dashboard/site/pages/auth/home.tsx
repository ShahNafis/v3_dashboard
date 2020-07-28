import Head from 'next/head'
import Layout from '../../components/Layout'
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
        title={`Welcome ${user.displayName}`}
      >
        Hello {user.displayName}
      </Layout>
    </div>
  )
}

export default Home
