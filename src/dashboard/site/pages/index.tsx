import Head from 'next/head'
import Layout from '../components/Layout'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Welcome to Coastal Image Labeler</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout showDrawer>
      Running on port {process.env.NEXT_PUBLIC_PORT} in{' '}
      {process.env.NEXT_PUBLIC_NODE_ENV} mode
      <a href="/auth/home">login</a>
    </Layout>
  </div>
)

export default Home
