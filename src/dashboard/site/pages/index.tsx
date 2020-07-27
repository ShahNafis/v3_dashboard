import Head from 'next/head'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    Running on port {process.env.NEXT_PUBLIC_PORT} in{' '}
    {process.env.NEXT_PUBLIC_NODE_ENV} mode
    <a href="/auth/home">login</a>
  </div>
)

export default Home
