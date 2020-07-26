import Head from 'next/head'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    Running on port {process.env.NEXT_PUBLIC_PORT} in{' '}
    {process.env.NEXT_PUBLIC_NODE_ENV} mode
  </div>
)

Home.getInitialProps = async () => {
  console.log(process?.env?.NEXT_PUBLIC_NODE_ENV)
  return {
    a: 1,
  }
}

export default Home
