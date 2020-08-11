import React from 'react'
import Head from 'next/head'

import Layout from '../../../../components/Layout'
import { GetServerSideProps } from 'next'
import getSession from '../../../../components/Utils/Auth/getSession'
import { getUserDB } from '../../../../components/API/getUserDB'
import { isUserPartOfcatalog } from '../../../../components/API/post/userPartOfCatalog'
import ErrorCard from '../../../../components/ErrorCards'
import { determineNavItems } from '../../../../components/Utils/Auth/determineNavItems'
import { ImageTag } from '../../../../components/Cards/ImageTag'

import { checkUserRole } from '../../../../components/Utils/Auth/checkRole'
import { generateUnAuthObj } from '../../../../components/Utils/Auth/unAuthError'
import { isValidArchive } from '../../../../components/API/post/isValidArchive'
import { getUserAssignedImage } from '../../../../components/API/post/getUserAssignedImage'

export default function TagImage(props) {
  const { user, success, message, imageDocument } = props

  return (
    <React.Fragment>
      <Head>
        <title>Tag Image: {imageDocument?.fileName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        user={props.user}
        navItems={determineNavItems(user)}
        title={`Welcome ${user?.displayName}`}
      >
        {!success ? (
          <ErrorCard message={message} title="Error" />
        ) : (
          <React.Fragment>
            <ImageTag user={user} imageDocument={imageDocument} />
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

  /*
    STEPS 
    1. Check user role
    2. Check if catalog is part of user
    3. Check for errors
    4. Check to see if archive is valid,and part of catalog
    5. Check for errors
    6. Get assigned Image
      a. If one is assigned, return
      b. If not
        1. Get catalog serve type
        2. Select image
        3. Assign
        4. Return
    7. Return
  */

  //check if user is a tagger
  const isTagger = checkUserRole({ roles: user.data?.roles, role: 'tagger' })
  if (!isTagger.success) {
    return {
      props: {
        user,
        ...generateUnAuthObj({
          message: `User ${user.data.userName} is not allowed to access this page`,
        }),
      },
    }
  }

  const { catalog = '', archive = '' } = context.query

  //check if user can tag this catalog
  const resUserPartOfCatalog = await isUserPartOfcatalog({
    cookie: context?.req?.headers?.cookie,
    res: context.res,
    catalogID: catalog as string,
  })

  //Check for error
  if (!resUserPartOfCatalog?.success) {
    return {
      props: {
        user,
        ...generateUnAuthObj({
          message: resUserPartOfCatalog.message,
        }),
      },
    }
  }

  //check to see if part of catalog
  if (!resUserPartOfCatalog?.data?.partOfCatalog) {
    return {
      props: {
        user,
        ...generateUnAuthObj({
          message: resUserPartOfCatalog.message,
        }),
      },
    }
  }

  //check if the archive is valid, and part of catalog
  const resIsValidArchive = await isValidArchive({
    archiveID: archive as string,
    cookie: context?.req?.headers?.cookie,
    res: context.res,
    catalogID: catalog as string,
  })

  //Check if success
  if (!resIsValidArchive?.success) {
    return {
      props: {
        user,
        ...generateUnAuthObj({
          message: resIsValidArchive.message,
        }),
      },
    }
  }

  //Check if valid
  if (!resIsValidArchive?.data?.archiveValid) {
    return {
      props: {
        user,
        ...generateUnAuthObj({
          message: `Invalid Archive ID of ${archive}`,
        }),
      },
    }
  }

  //Get assigned Image
  const resGetUserAssignedImage = await getUserAssignedImage({
    cookie: context?.req?.headers?.cookie,
    res: context.res,
    archiveID: archive as string,
  })
  console.log(resGetUserAssignedImage)

  return {
    props: {
      success: true,
      user,
      imageDocument: {
        _id: '_id-test',
        fileName: 'fileName',
        imageLink:
          'https://upload.wikimedia.org/wikipedia/commons/1/10/Zweihaender_im_historischen_Museum_Basel.JPG',
        compressedImageLink:
          'https://en.wikipedia.org/wiki/Estoc#/media/File:Panzerstecher_PP_noBg.jpg',
      },
    },
  }
}
