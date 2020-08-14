import Card from '@material-ui/core/Card'
import { useRouter } from 'next/router'

import { theme } from '../../theme'
import CardContent from '@material-ui/core/CardContent'

// import { questionSetData } from '../../data/testQuestions'
import { ResponseType } from '../../../../interfaces'
import GenericHookForm from '../../Forms/genricHookForm'
import { Header } from './Header'
import { ImageContainer } from './Image'

import {
  ImageDocument,
  QuestionSetDocument,
} from '../../../../interfaces/models'

function submitTags(tags): ResponseType {
  console.log(tags)
  return {
    message: `Tag keys ${Object.keys(tags)}`,
    success: true,
  }
}

interface Props {
  user: any
  imageDocument: ImageDocument
  questionSetDocument: QuestionSetDocument
}

export function ImageTag(props: Props) {
  const router = useRouter()
  const { catalog = '', archive = '' } = router.query

  const { imageDocument, questionSetDocument } = props

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
        />
      </CardContent>
    </Card>
  )
}
