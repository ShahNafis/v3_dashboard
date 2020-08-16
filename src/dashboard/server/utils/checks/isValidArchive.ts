import { ArchiveModel } from '../../models/Archive'

export async function isValidArchive(id: string) {
  try {
    const archive = await ArchiveModel.findOne({ _id: id })
    if (archive) {
      return {
        success: true,
        data: archive,
      }
    } else {
      return {
        success: false,
      }
    }
  } catch {
    return {
      success: false,
    }
  }
}
