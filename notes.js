const notes = {
  // trades should only execute when (desired - current) > $1000
  // maintain a certain amount of liquidity

  // initial buy weight correlates to rank, hold all tickers in the top list
  initialization: 'buyToOpen',

  entersTopList: 'buyToOpen',
  exitsTopList: 'sellToClose',

  // need to blacklist tickers that have been closed out

  // this might not help at all if weights are self managed
  positiveInsiderInterest: 'increasePosition',
  negativeInsiderInterest: 'decreasePosition',

  // full override granted to higher ranked triggers
  lowVolumePriceSpike: 'sellToClose',
  lowVolumePriceDrop: 'increasePosition',
  highVolumePriceSpike: 'hold',
  highVolumePriceDrop: 'sellToClose'
}

const trigger = {
  buyToOpen: [buyChecks, buyAdjustments],
  sellToClose: [sellChecks, sellAdjustments]
}

const checks = {}

// need to check thesis across varying time periods
// need some kind of downturn hedge
// need a way to draw down on earnings from the account (fixed trading pool of cash)
// need a trade execution notification system
// potentially need an approval checkpoint before execution
// need a circular buffer for data held in S3
// need to think about the total number of stocks to track
// need to mock the trades to see performance

// run a separate process that is pure puts
// should be able to run simultaneously with this program
