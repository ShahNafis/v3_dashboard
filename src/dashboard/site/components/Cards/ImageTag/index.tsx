import Card from '@material-ui/core/Card'
import { useRouter } from 'next/router'

import { theme } from '../../theme'
import CardContent from '@material-ui/core/CardContent'

// import { questionSetData } from '../../data/testQuestions'
import { ResponseType, UserProp } from '../../../../interfaces'
import GenericHookForm from '../../Forms/genricHookForm'
import { Header } from './Header'
import { ImageContainer } from './Image'

import { ShowTagData } from '../../Modal/showTagData'

import {
  ImageDocument,
  QuestionSetDocument,
} from '../../../../interfaces/models'
import React from 'react'

interface Props {
  user: UserProp
  imageDocument: ImageDocument
  questionSetDocument: QuestionSetDocument
}

export function ImageTag(props: Props) {
  const router = useRouter()
  const { catalog = '', archive = '' } = router.query

  const { imageDocument, questionSetDocument, user } = props

  const [tag, setTag] = React.useState({})
  const [openModal, setOpenModal] = React.useState(false)

  function submitTags(tags): ResponseType {
    const submitData = {
      userId: user.data._id,
      imageId: imageDocument._id,
      tags: tags,
      date: Date.now(),
      false: true,
    }

    setOpenModal(true)
    setTag(submitData)

    return {
      message: `Tag keys ${Object.keys(submitData)}`,
      success: true,
    }
  }

  return (
    <Card>
      <Header
        title={`Catalog ${catalog}`}
        subheader={`Archive ${archive} - ${imageDocument.name}`}
        style={{ color: theme.palette.primary.light }}
        subheaderStyle={{ color: theme.palette.secondary.main }}
      />
      <ImageContainer
        compressedLink={imageDocument.path.compressed}
        originalLink={imageDocument.path.original}
      />
      <CardContent>
        <GenericHookForm
          questionSetData={questionSetDocument}
          formFunctions={{
            skipImage: () => {},
            submitTags: submitTags,
          }}
          setTag={setTag}
        />
      </CardContent>
      <ShowTagData tag={tag} open={openModal} setOpen={setOpenModal} />
    </Card>
  )
}
