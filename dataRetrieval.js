const _ = require('lodash')
const { request } = require('./utils.js')

module.exports.getSortedStocks = async query => {
	const url = `http://finviz.com/screener.ashx?${query}`
	const parent = '.table-dark-row-cp, .table-light-row-cp'
	const children = [['td']]

	const header = await request({ url, selectors: { parent: ['.table-top'] } })
	const data = await request({ url, selectors: { parent, children } })
	return data.map(stock => _.zipObject(header, stock))
}

module.exports.getDetails = async stock => {
	const url = `http://finviz.com/quote.ashx?t=${stock.Ticker}`
	const parent = '.snapshot-table2'
	const children = ['td']

	const details = await request({ url, selectors: { parent, children } })

	return Object.assign({}, stock, _.fromPairs(_.chunk(details, 2)))
}
