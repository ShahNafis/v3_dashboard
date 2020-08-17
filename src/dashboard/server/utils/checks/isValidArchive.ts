import { ArchiveModel } from '../../models/Archive'

interface Param {
  _id?: string
  totalImages?: number
  name?: string
  catalog?: string
  taggable?: boolean
  dateAddded?: number | Date
  path?: {
    compressed: string
    original: string
  }
}

//✔️
export async function isValidArchive(query: Param) {
  try {
    const archive = await ArchiveModel.find(query)
    if (archive.length > 0) {
      return {
        success: true,
        data: archive,
      }
    } else {
      return {
        success: false,
        message: `No archive exists with query = ${JSON.stringify(query)}`,
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}
