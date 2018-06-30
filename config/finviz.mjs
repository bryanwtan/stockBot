export const stocks = {
  query: [
    [
      'v=111', // version
      'f=cap_smallover' // market cap over 300
    ].join('&'),
    'geo_usa', // usa companies
    'sh_curvol_o200', // current volume over 200k
    [
      'sh_insidertrans_verypos', // very positive insider trades (+20%)
      'ft=4', // optional filter set 4 (all available filters)
      'o=-marketcap' // sort by largest to smallest market capitalization
    ].join('&')
  ].join(','),
  parent: '.table-dark-row-cp, .table-light-row-cp',
  children: [['td']]
}

export const stockPage = {
  parent: '.snapshot-table2',
  children: ['td']
}
