import { Stock, Stocks } from './Model/Stock'

export class GASService {
  sheetId: string

  constructor(sheetId: string) {
    this.sheetId = sheetId
  }

  public getSheet = (): GoogleAppsScript.Spreadsheet.Spreadsheet => {
    const spreadSheet = SpreadsheetApp.openById(this.sheetId)

    if (!spreadSheet) {
      throw new Error(
        `指定したスプレッドシートファイルが見当たりません。SheetId:${this.sheetId}`
      )
    }

    return spreadSheet
  }

  public closeSpreadsheet(): void {
    SpreadsheetApp.flush()
  }

  public getStockRawData = (
    spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet
  ): Stocks => {
    // 名前が変わる可能性があるので注意が必要
    const stockSheetName = '在庫システム用'
    const stockSheet = spreadSheet.getSheetByName(stockSheetName)

    if (!stockSheet) {
      throw new Error(
        `指定したスプレッドシートファイルが見当たりません。SheetName:${stockSheetName}`
      )
    }

    const lastRow: number = stockSheet.getLastRow()
    // const targetScope = [2, 1, lastRow - 2, 5]
    // 2行目からコンテンツの最後まで x 1列目から5列目
    const stockRows: any[][] = stockSheet
      .getRange(2, 1, lastRow - 2, 6)
      .getValues()
      // "-"と空行を含むrecordを除く
      .filter((stockRow) => {
        return (
          // 空行を除く
          !stockRow.every((value) => value === '') &&
          // 販売コードなし
          stockRow[0] !== '-' &&
          // ColorMeコードなし
          stockRow[3] !== '-' &&
          // 反映しないアイテムを除く
          !stockRow[4] &&
          // 在庫数が存在している
          stockRow[5]
        )
      })

    console.log('反映するアイテム数', stockRows.length)
    console.log(stockRows)

    const stocks: Stocks = new Set(
      stockRows.map(
        (stockRow) =>
          new Stock(stockRow[0], stockRow[5], stockRow[3], stockRow[2])
      )
    )

    return stocks
  }
}
