module.exports.request = params => {
	const Xray = require('x-ray')

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

module.exports.stringify = obj => JSON.stringify(obj, null, '  ')

module.exports.applyType = value => {
	const _ = require('lodash')
	const check = require('./typeCheck.js')
	const map = require('./typeMap.js')

	const typedResult = _.reduce(check, (result, isType, type) => {
		return isType ? map[type](value) : result
	})

	return typedResult || value
}

module.exports.getInfo = s => ({
	ticker: s.Ticker,
	company: s.Company,
	sector: s.Sector,
	industry: s.Industry,
	country: s.Country,
	earnings: s.Earnings
})
