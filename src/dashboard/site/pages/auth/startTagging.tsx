import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/getUserDB'

import GenericHookForm from '../../components/Forms/genricHookForm'
import { questions } from '../../components/data/testQuestions'
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
        {/* <CheckboxesGroup/> */}
        <GenericHookForm
          questionSetData={{ questions: questions }}
          formFunctions={{
            tagAsWater: () => {},
            skipImage: () => {},
            submitTags: () => {},
          }}
        />
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

export default StartTagging
