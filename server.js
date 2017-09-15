const _ = require('lodash')
const fs = require('fs')
const { stringify, applyType, getInfo } = require('./utils.js')
const { finvizQuery } = require('./finviz.js')
const { getSortedStocks, getDetails } = require('./dataRetrieval.js')

const getEnrichedStockData = async query => {
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

getEnrichedStockData(finvizQuery)
