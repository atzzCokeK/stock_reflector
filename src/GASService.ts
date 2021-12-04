class GASService {
  sheetId: string

  constructor(sheetId: string) {
    this.sheetId = sheetId
  }

  getSheet = (): GoogleAppsScript.Spreadsheet.Spreadsheet => {
    const spreadSheet = SpreadsheetApp.openById(this.sheetId)

    if (!spreadSheet) {
      throw new Error(`指定したスプレッドシートファイルが見当たりません。SheetId:${this.sheetId}`)
    }

    return spreadSheet
  }

  closeSpreadsheet(): void {
    SpreadsheetApp.flush()
  }

  getStockRawData = (spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet) => {
    // 名前が変わる可能性があるので注意が必要
    const stockSheetName = '最新・在庫表'
    const stockSheet = spreadSheet.getSheetByName(stockSheetName)

    if (!stockSheet) {
      throw new Error(`指定したスプレッドシートファイルが見当たりません。SheetName:${stockSheetName}`)
    }

    const lastRow: number = stockSheet.getLastRow()
    // const targetScope = [5, 2, lastRow - 5, 10]
    // 5行目からコンテンツの最後まで x 2列目から10列目
    const stockRows: string[][] = stockSheet
      .getRange(5, 2, lastRow - 5, 10)
      .getValues()
      .filter((stockRow) => {
        return !stockRow.every((value) => value === '')
      })

    console.log('スプレッドシート上の在庫数', stockRows.length)
  }
}
