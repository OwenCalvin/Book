import PagesInfos from './pagesInfos'

export default class Loader {
  static get Count () {
    return PagesInfos.totalPages
  }

  // Turn a page
  static TurnPage (actualPage, value) {
    let newPage = actualPage + value
    return (newPage <= PagesInfos.totalPages && newPage > 0) ? newPage : actualPage
  }

  // Load view from JSON datas
  static LoadView (page) {
    let importFile = `${PagesInfos.path + PagesInfos.fileName + page + PagesInfos.extension}`
    return () => import(`${importFile}`)
  }

  // Return tru if page exists
  static PageExists (page) {
    return page <= PagesInfos.totalPages && page > 0
  }
}
