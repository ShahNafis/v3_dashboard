import Head from 'next/head'
import Layout from '../../components/Layout'

const StartTagging = (props): JSX.Element => {
  const { user } = props
  return (
    <div className="container">
      <Head>
        <title>Start Tagging</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        showDrawer
        user={props.user}
        appbarType="basic"
        title={`Welcome ${user.displayName}`}
      >
        Start Tagging Images {user.displayName}
      </Layout>
    </div>
  )
}

export default StartTagging
