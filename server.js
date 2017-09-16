const _ = require('lodash')
const fs = require('fs')

const { stringify, applyType } = require('./utils.js')
const { finvizQuery } = require('./config/finviz.js')
const output = require('./config/output.js')
const { getSortedStocks, getDetails } = require('./dataRetrieval.js')

const getEnrichedStockData = async query => {
	const stocks = await getSortedStocks(query)
	const results = {
		// original: await Promise.all(stocks.map(stock => getDetails(stock))),
		best: await Promise.all(
			stocks.map(async stock => {
				return await _.mapValues(await getDetails(stock), v => applyType(v))
			})
		)
	}

	output.forEach(o => {
		fs.writeFile(
			`./out/${o.file}.json`,
			stringify(o.func(results[o.data])),
			err => {
				console.log(err ? err : `${o.file}.json updated`)
			}
		)
	})
}

getEnrichedStockData(finvizQuery)
