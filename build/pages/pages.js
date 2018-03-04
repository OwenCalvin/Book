const fs = require('fs')
const colors = require('colors')

const pageBaseName = 'Page'
const separate = '_'
const pageName = pageBaseName + separate
const pageExtension = 'vue'
const articlesFile = 'pagesInfos.js'
const articlePath = './src/pager/'
const pagesFolder = articlePath + 'pages/'
const relativePathForArticlesJS = './pages/'
const templatePath = './build/pages/Template.vue'

switch (process.argv[2]) {
  case 'create':
    create()
    break

  case 'compile':
    compile()
    break

  default:
    console.log('Command not found')
    break
}

function create () {
  fs.readdir(pagesFolder, (err, files) => {
    if (err) {
      console.log(err)
    } else {
      let number = Math.abs(parseInt(process.argv[3]))
      let iterations = number ? number : 1
      for (let i = 0; i < iterations; i++) {
        let newFileName = getNewFileName(files.length + i + 1)
        fs.copyFile(templatePath, pagesFolder + newFileName, err => {
          if (err) {
            console.log(err)
          }
        })
      }
      console.log(colors.green(`${iterations} page${iterations > 1 ? 's ont' : ' a'} été créée${iterations > 1 ? 's' : ''}\n`))
    }
  })
}

function compile () {
  fs.readdir(pagesFolder, (err, files) => {
    if (err) {
      console.log(err)
    } else {
      let stdout = `/* eslint-disable */\nexport default {path: '${relativePathForArticlesJS}', fileName: '${pageName}', extension: '${pageExtension}', totalPages: `
      let totalPages = 0
      files.forEach(file => {
        let fileInfos = getFileInfos(file)
        if (fileInfos.pageBase === pageBaseName && fileInfos.pageExtension === pageExtension) {
          if (fileInfos.pageNumber <= files.length && fileInfos.pageNumber > 0) {
            totalPages += 1
          } else {
            console.log(colors.red('Le numéro de page est incorrect ' + fileInfos.pageNumber))
            logCorrect()
          }
        } else {
          console.log(colors.red('Le nom de ce fichier n\'est pas correct: ' + colors.underline(file)))
          logCorrect()
        }
      })
      stdout += totalPages + '}\n'

      console.log(colors.green('\nTout est okay !'))
      console.log(colors.green('(Les fichiers contenants des erreurs sont ignorés)\n'))
      fs.writeFile(articlePath + articlesFile, stdout, err => {
        if (err) {
          console.log(err)
        }
      })
    }
  })
}

function getNewFileName (pageNumber) {
  return pageName + pageNumber + '.' + pageExtension
}

function logCorrect (extra = '') {
  console.log(colors.blue('Syntaxe correcte: ') + colors.blue.underline('Page_[Numéro].vue' + extra))
}

function getFileInfos (file) {
  let fileName = file // Page_1234.vue
  let pageFilesInfos = fileName.split('.') // [0] = Page_1234  [1] = vue
  let pageExtension = pageFilesInfos[pageFilesInfos.length - 1] // vue
  let pageArgs = pageFilesInfos[0].split(separate) // [0] = Page  [1] = 1234
  let pageNumber = parseInt(pageArgs[1]) // 1234
  let pageBase = pageArgs[0] // Page

  return {
    fileName: fileName,
    pageFilesInfos: pageFilesInfos,
    pageExtension: pageExtension,
    pageArgs: pageArgs,
    pageNumber: pageNumber,
    pageBase: pageBase
  }
}
