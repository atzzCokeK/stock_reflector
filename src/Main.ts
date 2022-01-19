import { ColorMe } from './ColorMe'
import { GASService } from './GASService'
import { Stocks } from './Model/Stock'

const scriptProperties: GoogleAppsScript.Properties.Properties =
  PropertiesService.getScriptProperties()

const init = (
  colorMeAccessToken: string,
  sheetId: string
): [gasService: GASService, ColorMe: ColorMe, stocks: Stocks] => {
  const gasService = new GASService(sheetId)
  const colorMe: ColorMe = new ColorMe(colorMeAccessToken)

  const stockSheet = gasService.getSheet()
  const stocks: Stocks = gasService.getStockRawData(stockSheet)

  return [gasService, colorMe, stocks]
}

const executeProd = () => {
  const colorMeAccessToken: string | null = scriptProperties.getProperty(
    'PROD_COLORME_ACCESS_TOKEN'
  )
  const sheetId: string | null = scriptProperties.getProperty(
    'PROD_STOCK_SHEET_ID'
  )

  if (!colorMeAccessToken || !sheetId) {
    throw new Error('ColorMeAccessTokenか、SheetIdを取得できていません。')
  }

  const [gasService, colorMe, stocks] = init(colorMeAccessToken, sheetId)

  gasService.closeSpreadsheet()

  colorMe.update(stocks)
}

const executeDev = () => {
  const colorMeAccessToken: string | null = scriptProperties.getProperty(
    'DEV_COLORME_ACCESS_TOKEN'
  )
  const sheetId: string | null =
    scriptProperties.getProperty('DEV_STOCK_SHEET_ID')

  if (!colorMeAccessToken || !sheetId) {
    throw new Error('ColorMeAccessTokenか、SheetIdを取得できていません。')
  }

  const [gasService, colorMe, stocks] = init(colorMeAccessToken, sheetId)

  gasService.closeSpreadsheet()

  colorMe.update(stocks)
}
