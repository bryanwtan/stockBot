import _ from 'lodash'
import fs from 'fs'

import { stringify } from './utils/communication'
import { applyType } from './utils/dataTypes'
import output from './config/output'
import { scrapeStocks, scrapeStockDetails } from './utils/dataRetrieval'

const getEnrichedStockData = async () => {
  const stocks = await scrapeStocks()
  const results = {
    original: await Promise.all(stocks.map(stock => scrapeStockDetails(stock))),
    best: await Promise.all(
      stocks.map(async stock => {
        return await _.mapValues(await scrapeStockDetails(stock), v =>
          applyType(v)
        )
      })
    )
  }

  output.forEach(o => {
    fs.writeFile(
      `./out/${o.file}.json`,
      stringify(o.func(results[o.data])),
      err => {
        console.log(err ? err : `${o.file}.json updated`)
      }
    )
  })
}

getEnrichedStockData()
