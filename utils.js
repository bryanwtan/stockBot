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
	const type = require('./stringTypeCheck.js')

	const typedResult = _.reduce(type.check, (result, isType, knownType) => {
		return isType ? type.apply[knownType](value) : result
	})

	return typedResult || value
}
