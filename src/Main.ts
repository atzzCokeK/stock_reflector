const execute = () => {
  const scriptProperties: GoogleAppsScript.Properties.Properties = PropertiesService.getScriptProperties()
  const colorMeAccessToken: string | null = scriptProperties.getProperty('COLORME_ACCESS_TOKEN')
  const sheetId: string | null = scriptProperties.getProperty('STOCK_SHEET_ID')

  if (!colorMeAccessToken || !sheetId) {
    throw new Error('ColorMeAccessTokenか、SheetIdを取得できていません。')
  }

  const gasService = new GASService(sheetId)
  const stockSheet = gasService.getSheet()
  const stockData = gasService.getStockRawData(stockSheet)
}
