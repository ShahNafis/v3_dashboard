import { ArchiveModel } from '../../models/Archive'

export async function isValidArchive(id: string) {
  try {
    const archive = await ArchiveModel.findOne({ _id: id })
    if (archive) {
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}
