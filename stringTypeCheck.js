module.exports.check = {
	number: v => Number(v),
	baseIsNumber: v => Number(baseChars(v)) && lastChar(v) === '%',
	zero: v => baseChars(v) === '0.00' && lastChar(v) === '%',
	billion: v => lastChar(v) === 'B' && Number(baseChars(v)),
	million: v => lastChar(v) === 'M' && Number(baseChars(v)),
	boolTrue: v => v === 'Yes',
	boolFalse: v => v === 'No',
	comma: v => Number(v.split(',').join(''))
}

module.exports.apply = {
	number: v => parseFloat(v),
	baseIsNumber: v => parseFloat((parseFloat(v) / 100).toFixed(4)),
	zero: () => 0,
	billion: v => parseFloat(v) * Math.pow(10, 9),
	million: v => parseFloat(v) * Math.pow(10, 6),
	boolTrue: () => true,
	boolFalse: () => false,
	comma: v => parseFloat(v.split(',').join(''))
}
