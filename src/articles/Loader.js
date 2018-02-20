import Articles from './Articles'

export default class Loader {
  // Return the number of articles
  static get Count () {
    return Articles.length
  }

  // Turn a page
  static TurnPage (actualPage, value) {
    let newPage = actualPage + value
    return (newPage <= Loader.Count && newPage > 0) ? newPage : actualPage
  }

  // Load view from JSON datas
  static LoadView (page) {
    return Loader.Load(page).view
  }

  // Load datas from JSON file
  static Load (page) {
    return Articles.find(article => {
      return parseInt(article.page) === parseInt(page)
    })
  }
}
