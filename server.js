const _ = require('lodash')
const fs = require('fs')
const { stringify, applyType, request, getInfo } = require('./utils.js')

const getSortedStocks = async query => {
	const url = `http://finviz.com/screener.ashx?${query}`
	const parent = '.table-dark-row-cp, .table-light-row-cp'
	const children = [['td']]

	const header = await request({ url, selectors: { parent: ['.table-top'] } })
	const data = await request({ url, selectors: { parent, children } })
	return data.map(stock => _.zipObject(header, stock))
}

const getDetails = async stock => {
	const url = `http://finviz.com/quote.ashx?t=${stock.Ticker}`
	const parent = '.snapshot-table2'
	const children = ['td']

	const details = await request({ url, selectors: { parent, children } })

	return Object.assign({}, stock, _.fromPairs(_.chunk(details, 2)))
}

const getEnrichedStockData = async () => {
	const query = [
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
	].join(',')

	const stocks = await getSortedStocks(query)

	const originalData = await Promise.all(stocks.map(stock => getDetails(stock)))

	const bestStocks = await Promise.all(
		stocks.map(async stock => {
			return await _.mapValues(await getDetails(stock), v => applyType(v))
		})
	)

	fs.writeFileSync('info.json', bestStocks.map(s => stringify(getInfo(s))))
	fs.writeFileSync('originalData.json', stringify(originalData))
	fs.writeFileSync('bestStocks.json', stringify(bestStocks))

	console.info(`data for ${bestStocks.length} saved`)
}

getEnrichedStockData()
