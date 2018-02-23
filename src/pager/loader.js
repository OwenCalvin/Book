import PagesInfos from './pagesInfos'

export default class Loader {
  static get Count () {
    return PagesInfos.totalPages
  }

  // Turn a page
  static TurnPage (actualPage, value) {
    let newPage = actualPage + value
    return Loader.PageExists(newPage) ? newPage : actualPage
  }

  // Load view from JSON datas
  static LoadView (page) {
    let importFile = `${PagesInfos.path + PagesInfos.fileName + page + '.' + PagesInfos.extension}`
    return () => import(`${importFile}`)
  }

  // Return true if page exists
  static PageExists (page) {
    return page <= PagesInfos.totalPages && page > 0
  }
}
