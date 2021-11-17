
const execute = () => {
    const scriptProperties: GoogleAppsScript.Properties.Properties = PropertiesService.getScriptProperties();
    const colormeAccessToken: string = scriptProperties.getProperty("COLORME_ACCESS_TOKEN")
    const sheetId: string = scriptProperties.getProperty("COLORME_ACCESS_TOKEN")

    const stockSheet = new StockSheet(sheetId)
}