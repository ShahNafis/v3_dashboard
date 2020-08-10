import { CatalogModel } from '../../models/Catalog'
import { getDirectories } from '../../utils/file'
import colorize from '../../utils/colorize'

import { createArchives } from './createArchive'

interface Params {
  catalogPath: string
  compressedCatalogPath: string
  imageFormat: [string]
  name: string
  questionSet: string
  catalogInfo: {
    year: number
    link: string
    description: string
  }
  taggable: boolean
}

export async function createCatalog(catalogData: Params) {
  const {
    compressedCatalogPath,
    catalogInfo,
    imageFormat,
    name,
    catalogPath,
    questionSet,
    taggable,
  } = catalogData

  //check if catalog exists. If it does dont create it.
  let catalogEntry = await CatalogModel.findOne({
    name: name,
    path: catalogPath,
    compressedPath: compressedCatalogPath,
  })

  if (!catalogEntry) {
    try {
      //throw new Error("Testing catalog error");

      catalogEntry = await CatalogModel.create({
        name: name,
        path: catalogPath,
        questionSet: questionSet,
        taggable: taggable,
        compressedPath: compressedCatalogPath,
        catalogInfo: {
          ...catalogInfo,
        },
        dateAdded: Date.now(),
      })
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  } else {
    colorize.info('Catalog already exists')
  }

  const archiveFolders = getDirectories(catalogPath)

  //For each archive of a catalog
  for (const archiveName of archiveFolders) {
    const res = await createArchives({
      archiveName: archiveName,
      catalogEntry: catalogEntry,
      catalogPath: catalogPath,
      imageFormat: imageFormat,
    })

    if (!res.success) {
      colorize.error(res.message)
    }
  }

  return {
    success: true,
    message: 'Created all data',
  }
}
