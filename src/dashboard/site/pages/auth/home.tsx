import Head from 'next/head'

export const Home = (props): JSX.Element => {
  console.log(Object.keys(props.user))
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello {props.user.displayName}
      <a href="/logout">out</a>
    </div>
  )
}

export default Home
