import PagesInfos from './pagesInfos'

export default class Loader {
  static get Count () {
    return PagesInfos.totalPages
  }

  // Turn a page
  static TurnPage (actualPage, value) {
    let newPage = actualPage + value
    if (Loader.PageExists(newPage)) {
      return newPage
    } else {
      if (newPage <= 0) {
        return Loader.Count
      } else if (newPage > Loader.Count) {
        return 1
      }
    }
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
