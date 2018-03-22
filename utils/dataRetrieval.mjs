import _ from 'lodash'
import Xray from 'x-ray'

import { stocks, stockPage } from '../config/finviz'

export const request = params => {
	const { url, filters, limit } = params
	const { parent, children, pagination } = params.selectors

	const x = filters ? Xray({ filters }) : Xray()

	return new Promise((resolve, reject) => {
		try {
			x(url, parent, children)((error, results) => {
				if (error) return reject(error)
				resolve(results)
			})
				.paginate(pagination)
				.limit(limit)
		} catch (error) {
			reject(error)
		}
	})
}

export const scrapeStocks = async () => {
	const { query, parent, children } = stocks
	const url = `http://finviz.com/screener.ashx?${query}`

	const header = await request({ url, selectors: { parent: ['.table-top'] } })
	const data = await request({ url, selectors: { parent, children } })
	return data.map(stock => _.zipObject(header, stock))
}

export const scrapeStockDetails = async stock => {
	const { parent, children } = stockPage
	const url = `http://finviz.com/quote.ashx?t=${stock.Ticker}`

	const details = await request({ url, selectors: { parent, children } })

	return Object.assign({}, stock, _.fromPairs(_.chunk(details, 2)))
}
