
//import inquirer from 'inquirer'
import colors from 'colors'
colors
// import {yesNoOnly,translateYesNoToBool} from '../utils/validation'
import {getDirectories,getFiles} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager';

import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import {ImageModel} from '../models/Image'
// import colorize from '../utils/colorize'

//import {isRequired} from '../utils/validation'
import fs from 'fs'

import unhandledRejection from '../utils/unhandledRejection'
import colorize from '../utils/colorize';

unhandledRejection

interface Options {
    path: string
}

const catalog = {
    async add(options: Options) {
        const {
            path
        } = options
        
        //connect to db
        const uriManager = new UriManager();
        const mongoConnection = new MongoConnection(uriManager.getKey())
        await mongoConnection.connect()

        //Read the settings json
        const file = JSON.parse(fs.readFileSync(path, 'utf8'));
        
        //For each catalog provided
        for(let  i =0;i<file.catalogs.length;i++) {
            const catalog = file.catalogs[i]
            const {
                path: catalogPath,
                compressedPath,
                imageFormat,
                name,
                questionSet,
                catalogInfo
            } = catalog 

            //check if catalog exists
            let catalogEntry = await CatalogModel.findOne({
                name: name,
                path: catalogPath,
                compressedPath:compressedPath,
            })
            
            if(!catalogEntry) {
                catalogEntry = await CatalogModel.create({
                    name: name,
                    path: catalogPath,
                    questionSet:questionSet,
                    taggable:true,
                    compressedPath:compressedPath,
                    catalogInfo:{
                        ...catalogInfo
                    },
                    dateAdded: Date.now()
                })
                colorize.success('Created new catalog')
            } else {
                colorize.info('Catalog already exists')
            }
            

            const archiveFolders = getDirectories(catalogPath)

            //For each archive of a catalog
            for(const archiveName of archiveFolders) {
                const archivePath = `${catalogPath}/${archiveName}`
                const images = getFiles(archivePath,imageFormat)

                let archiveEntry = await ArchiveModel.findOne({
                    catalog:catalogEntry._id,
                    name:archiveName,
                    path:archivePath,
                })

                if(!archiveEntry) {
                    archiveEntry = await ArchiveModel.create({
                        catalog:catalogEntry._id,
                        compressedPath:archivePath,
                        name:archiveName,
                        path:archivePath,
                        taggable:true,
                        dateAdded: Date.now()
                    })
                    colorize.success('Created new archive')
                } else {
                    colorize.info('Archive already exists')
                }
                for(const image of images) {
                    const imagePath = `/${image}`
                    let imageEntry = await ImageModel.findOne({
                        archive:archiveEntry._id,
                        path:imagePath,
                        name:image
                    })
    
                    if(!imageEntry) {
                        imageEntry = await ImageModel.create({
                            archive:archiveEntry._id,
                            name:image,
                            path:imagePath,
                            numberOfMatches:2,
                            taggable: true,
                            dateAdded: Date.now(),  
                        })
                        colorize.success('Created new image')
                    } else {
                        colorize.info('Image already exists')
                    }
                }
            }
        }
     
        await mongoConnection.close()
        
    }
}

export default catalog;