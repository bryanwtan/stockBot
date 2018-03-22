const getInfo = s => ({
	ticker: s.Ticker,
	company: s.Company,
	sector: s.Sector,
	industry: s.Industry,
	country: s.Country,
	earnings: s.Earnings
})

export default [
	{
		file: 'info',
		data: 'best',
		func: d => d.map(s => getInfo(s))
	},
	{
		file: 'original',
		data: 'original',
		func: d => d
	},
	{
		file: 'best',
		data: 'best',
		func: d => d
	}
]
