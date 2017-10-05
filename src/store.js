const store = {
  order: {
    searchTerm: '',
    rankingMode: 'alltime',
    sortTerm: 'brownies',
    reverse: false,
    browniesMode: 'alltime'
  },
  rankingModes: ['alltime', 'recent'],
  sortTerms: ['alpha', 'brownies'],
  api: {
    alltime: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
    recent: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
  },
  campers: []
}

export default store;