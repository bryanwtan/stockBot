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
	if (Number(value)) {
		// normal numbers
		value = parseFloat(value)
	} else if (value.slice(-1) === '%') {
		// percentages
		if (value.slice(0, -1).toString() === '0.00') {
			// handle 0.00
			value = 0
		} else if (Number(value.slice(0, -1))) {
			// fix decimals to prevent floating point issues
			value = parseFloat((parseFloat(value) / 100).toFixed(4))
		}
	} else if (value.slice(-1).toString() === 'B' && Number(value.slice(0, -1))) {
		// billions
		value = parseFloat(value) * Math.pow(10, 9)
	} else if (value.slice(-1).toString() === 'M' && Number(value.slice(0, -1))) {
		// millions
		value = parseFloat(value) * Math.pow(10, 6)
	} else if (value === 'Yes') {
		// boolean
		value = true
	} else if (value === 'No') {
		// boolean
		value = false
	} else if (Number(value.split(',').join(''))) {
		// commas
		value = parseFloat(value.split(',').join(''))
	}

	return value
}
