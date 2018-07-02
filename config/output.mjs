import _ from 'lodash'

import { applyType } from '../utils/dataTypes'

const getInfo = s => ({
  ticker: s.Ticker,
  company: s.Company,
  sector: s.Sector,
  industry: s.Industry,
  country: s.Country,
  earnings: s.Earnings
})

export default [
  {
    file: 'info',
    func: d => d.map(s => getInfo(s))
  },
  {
    file: 'original',
    func: d => d
  },
  {
    file: 'best',
    func: d => d.map(s => _.mapValues(s, v => applyType(v)))
  }
]
