import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../components/Utils/Auth/getSession'
import { getUserDB } from '../../components/API/getUserDB'
import { getStartTaggingTableData } from '../../components/API/get/startTaggingData'
import { determineNavItems } from '../../components/Utils/Auth/determineNavItems'
import { SelectArchive } from '../../components/Tables/SelectArchive'
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
        user={props.user}
        navItems={determineNavItems(user)}
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
  const selectionData = await getStartTaggingTableData({
    cookie: context?.req?.headers?.cookie,
    res: context.res,
  })

  return {
    props: {
      user,
      selectionData: selectionData,
      // [
      //   {
      //     name: 'Catalog 1',
      //     _id: 'idCat1',
      //     catalogInfo: {
      //       year: 1066,
      //       link: '#link1',
      //       description: `
      //       The Battle of Hastings[a] was fought on 14 October 1066 between the
      //       Norman-French army of William, the Duke of Normandy, and an
      //       English army under the Anglo-Saxon King Harold
      //       Godwinson, beginning the Norman conquest of
      //       England. It took place approximately 7 miles (11 kilometres) northwest
      //       of Hastings, close to the present-day town of Battle,
      //       East Sussex, and was a decisive Norman victory.
      //       `,
      //     },
      //     totalImages: 110,
      //     archives: [
      //       {
      //         name: 'Archive 1',
      //         totalImages: 10,
      //         _id: 'idArc1',
      //       },
      //       {
      //         name: 'Archive 2',
      //         totalImages: 100,
      //         _id: 'idArc2',
      //       },
      //     ],
      //   },
      //   {
      //     name: 'Catalog 2',
      //     _id: 'idCat2',
      //     catalogInfo: {
      //       year: 1776,
      //       link: '#link2',
      //       description: 'COLORS LOTS OF COLORS',
      //     },
      //     totalImages: 10,
      //     archives: [
      //       {
      //         name: 'Archive 3',
      //         totalImages: 10,
      //         _id: 'idArc3',
      //       },
      //     ],
      //   },
      // ],
    },
  }
}

export default StartTagging
