module.exports = {
	number: v => parseFloat(v),
	baseIsNumber: v => parseFloat((parseFloat(v) / 100).toFixed(4)),
	zero: () => 0,
	billion: v => parseFloat(v) * Math.pow(10, 9),
	million: v => parseFloat(v) * Math.pow(10, 6),
	boolTrue: () => true,
	boolFalse: () => false,
	comma: v => parseFloat(v.split(',').join(''))
}
