
const execute = () => {
    const scriptProperties: GoogleAppsScript.Properties.Properties = PropertiesService.getScriptProperties();
    const colormeAccessToken: string = scriptProperties.getProperty("COLORME_ACCESS_TOKEN")
    const sheetId: string = scriptProperties.getProperty("STOCK_SHEET_ID")

    const stockSheet = new StockSheet(sheetId)
}