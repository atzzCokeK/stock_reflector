import { Stocks, Variants } from './Model/Stock'

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
          this.getColorMeId(stockRow) !== '-' &&
          // 反映しないアイテムを除く
          !stockRow[4] &&
          // 在庫数が存在している
          this.getQuantity(stockRow) !== ''
        )
      })

    console.log('反映するアイテム数', stockRows.length)
    console.log(stockRows)

    const stocks: Stocks = this.newStocksFromRawData(stockRows)

    return stocks
  }

  private newStocksFromRawData = (stockRows: any[][]): Stocks => {
    const newStocks: Stocks = new Map()

    stockRows.forEach((stockRow) => {
      const alreadyExistedVariants = newStocks.get(this.getColorMeId(stockRow))

      if (alreadyExistedVariants) {
        const nextVariants = alreadyExistedVariants.set(
          this.getVariant(stockRow),
          this.getQuantity(stockRow)
        )

        newStocks.set(this.getColorMeId(stockRow), nextVariants)

        return
      }

      const newVariants: Variants = new Map()
      newStocks.set(
        this.getColorMeId(stockRow),
        newVariants.set(this.getVariant(stockRow), this.getQuantity(stockRow))
      )

      return
    })

    return newStocks
  }

  private getColorMeId = (stockRow: any[]) => stockRow[3]
  private getQuantity = (stockRow: any[]) => stockRow[5]
  private getVariant = (stockRow: any[]) => stockRow[2]
}
