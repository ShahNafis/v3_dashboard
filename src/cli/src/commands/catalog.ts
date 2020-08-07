
//import inquirer from 'inquirer'
import colors from 'colors'
colors
// import {yesNoOnly,translateYesNoToBool} from '../utils/validation'
// import {getDirectories} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager';

// import {CatalogModel} from '../models/Catalog'
// import {ArchiveModel} from '../models/Archive'
// import {ImageModel} from '../models/Image'
// import colorize from '../utils/colorize'

//import {isRequired} from '../utils/validation'
import fs from 'fs'

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

        const file = JSON.parse(fs.readFileSync(path, 'utf8'));
        console.log(file)

        await mongoConnection.close()
        
    }
}

export default catalog;