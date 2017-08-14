const baseChars = v => v.slice(0, -1).toString()
const lastChar = v => v.slice(-1)

module.exports.number = v => Number(v)

module.exports.baseIsNumber = v => Number(baseChars(v)) && lastChar(v) === '%'
module.exports.zero = v => baseChars(v) === '0.00' && lastChar(v) === '%'

module.exports.billion = v => lastChar(v) === 'B' && Number(baseChars(v))
module.exports.million = v => lastChar(v) === 'M' && Number(baseChars(v))

module.exports.boolTrue = v => v === 'Yes'
module.exports.boolFalse = v => v === 'No'

module.exports.comma = v => Number(v.split(',').join(''))
