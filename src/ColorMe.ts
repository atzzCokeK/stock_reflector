import { Stock, Stocks } from './Model/Stock'

export class ColorMe {
  accessToken: string
  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  // 共通化されたURL生成関数
  private makeUrl = (productId: number): string =>
    `https://api.shop-pro.jp/v1/products/${productId}`

  public update = (stocks: Stocks) => {
    stocks.forEach((stock: Stock) => {
      const url = this.makeUrl(stock.colorMeId)
      try {
        const response = JSON.parse(
          UrlFetchApp.fetch(
            url,
            this.options(stock.quantity, stock.variant)
          ).getContentText()
        )

        console.log('ColorMeへのリクエスト結果', response)

        if (response.errors) {
          throw new Error(JSON.stringify(response.errors[0]))
        }
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message)
        }
      }
    })
  }

  private options = (
    quantity: number,
    variant: string
  ): GoogleAppsScript.URL_Fetch.URLFetchRequestOptions => {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    }

    const payload = (amount: number, variant: string): string => {
      if (variant === '' || variant === '-') {
        return JSON.stringify({
          product: { stocks: amount }
        })
      }

      return JSON.stringify({
        product: { variants: { option1_value: variant, stocks: amount } }
      })
    }

    return {
      method: 'put',
      payload: payload(quantity, variant),
      headers: headers,
      muteHttpExceptions: true
    }
  }
}
