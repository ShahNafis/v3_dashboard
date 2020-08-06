import React from 'react'
import Head from 'next/head'

import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/getUserDB'
import ErrorCard from '../../components/ErrorCards'
import { determineAppbar } from '../../components/Utils/Auth/determineAppbar'
import { HomeText } from '../../components/StaticText/home'
import { ResumeTagging } from '../../components/Tables/ResumeTagging'
import { ResumeTaggingData } from '../../../interfaces'

interface Props {
  user: any
  resumeTableData: ResumeTaggingData[]
  success: boolean
  message?: string
}

export const Home = (props: Props): JSX.Element => {
  const { user, success, message, resumeTableData } = props

  return (
    <div className="container">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        user={props.user}
        appbarType={determineAppbar(props.user)}
        title={`Welcome ${user?.displayName}`}
      >
        {!success ? (
          <ErrorCard message={message} title="Error" />
        ) : (
          <React.Fragment>
            <HomeText displayName={user?.displayName} />
            <ResumeTagging data={resumeTableData} />
          </React.Fragment>
        )}
      </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const user: any = getSession(context.req)
  user.data =
    (await getUserDB({
      cookie: context?.req?.headers?.cookie,
      res: context.res,
    })) ?? {}

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
      resumeTableData: [
        {
          catalogName: 'Catalog 1',
          archives: [
            {
              archiveName: 'Archive 1',
              total: 10,
              tagged: 5,
              link: '#a1',
            },
            {
              archiveName: 'Archive 2',
              total: 100,
              tagged: 3,
              link: '#a2',
            },
          ],
        },
        {
          catalogName: 'Catalog 2',
          archives: [
            {
              archiveName: 'Archive 3',
              total: 10,
              tagged: 2,
              link: '#a3',
            },
          ],
        },
      ],
    },
  }
}

export default Home
