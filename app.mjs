import fs from 'fs'

import output from './config/output'
import { scrapeStocks, scrapeStockDetails } from './utils/dataRetrieval'

const stringify = obj => JSON.stringify(obj, null, '  ')

const getEnrichedStockData = async () => {
  const stocks = await scrapeStocks()

  const results = await Promise.all(
    stocks.map(stock => scrapeStockDetails(stock))
  )

  output.forEach(({ file, func }) => {
    fs.writeFile(`./out/${file}.json`, stringify(func(results)), err => {
      console.log(err ? err : `${file}.json updated`)
    })
  })
}

getEnrichedStockData()
