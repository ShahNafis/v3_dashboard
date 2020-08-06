import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/getUserDB'
import { determineAppbar } from '../../components/Utils/Auth/determineAppbar'
import { SelectArchive } from '../../components/Stepper/selectArchive'
import { CatalogSelectionData } from '../../../interfaces'

const StartTagging = (props): JSX.Element => {
  const {
    user,
    selectionData,
  }: { user: any; selectionData: CatalogSelectionData[] } = props

  return (
    <div className="container">
      <Head>
        <title>Start Tagging</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        showDrawer
        user={props.user}
        appbarType={determineAppbar(props.user)}
        title={`Welcome ${user.displayName}`}
      >
        <SelectArchive data={selectionData} />
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
      selectionData: [
        {
          name: 'Catalog 1',
          _id: 'idCat1',
          catalogInfo: {
            year: 1066,
            link: '#link1',
            description: 'Battle of Hastings',
          },
          totalImages: 110,
          archives: [
            {
              name: 'Archive 1',
              totalImages: 10,
              _id: 'idArc1',
            },
            {
              name: 'Archive 2',
              totalImages: 100,
              _id: 'idArc2',
            },
          ],
        },
        {
          name: 'Catalog 2',
          _id: 'idCat2',
          catalogInfo: {
            year: 1776,
            link: '#link2',
            description: 'COLORS LOTS OF COLORS',
          },
          totalImages: 10,
          archives: [
            {
              name: 'Archive 3',
              totalImages: 10,
              _id: 'idArc3',
            },
          ],
        },
      ],
    },
  }
}

export default StartTagging
