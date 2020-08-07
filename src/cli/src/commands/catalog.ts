
//import inquirer from 'inquirer'
import colors from 'colors'
colors
// import {yesNoOnly,translateYesNoToBool} from '../utils/validation'
import {getDirectories,getFiles} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager';

import {CatalogModel} from '../models/Catalog'
// import {ArchiveModel} from '../models/Archive'
// import {ImageModel} from '../models/Image'
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
            console.log('Archives',archiveFolders)

            //For each archive of a catalog
            for(const archiveName of archiveFolders) {
                const archivePath = `${catalogPath}/${archiveName}`
                const images = getFiles(archivePath,imageFormat)
                console.log(images)
            }
        }
     
        await mongoConnection.close()
        
    }
}

export default catalog;