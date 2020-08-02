import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/getUserDB'
import ErrorCard from '../../components/ErrorCards'

// import GenericHookForm from '../../components/Forms/genricHookForm'
// import { questions } from '../../components/data/testQuestions'
// import radioData from '../../components/data/testRadios'
import Test from '../../components/Demo/form'
export default function TagImage(props) {
  const { user, success, message } = props
  return (
    <React.Fragment>
      <Head>
        <title>Tag Image</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        user={props.user}
        appbarType="basic"
        title={`Welcome ${user?.displayName}`}
      >
        {!success ? (
          <ErrorCard message={message} title="Error" />
        ) : (
          <React.Fragment>
            Hello {user?.displayName}|{user.data._id}
            {/* <GenericHookForm
              questionSetData={{
                questions: questions,
                name: 'Test',
                description: 'Test desc',
              }}
              formFunctions={{
                tagAsWater: () => {
                  console.log('a')
                },
                skipImage: () => {
                  console.log('a')
                },
                submitTags: () => {
                  console.log('a')
                },
              }}
            /> */}
            <Test />
          </React.Fragment>
        )}
      </Layout>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const user: any = getSession(context.req)
  user.data = await getUserDB({
    cookie: context?.req?.headers?.cookie,
    res: context.res,
  })

  if (Object.keys(user.data).length === 0) {
    return {
      props: {
        success: false,
        message: 'Error getting User data',
      },
    }
  }
  return {
    props: {
      success: true,
      user,
    },
  }
}
