import { ColorMeId, Stocks, Variants } from './Model/Stock'

export class ColorMe {
  accessToken: string
  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  // 共通化されたURL生成関数
  private makeUrl = (productId: string): string =>
    `https://api.shop-pro.jp/v1/products/${productId}`

  public update = (stocks: Stocks) => {
    stocks.forEach((variants: Variants, colorMeId: ColorMeId) => {
      const url = this.makeUrl(colorMeId)

      try {
        console.log('colorMeId:', colorMeId)
        console.log('options:', this.makeOptions(variants))

        const response = JSON.parse(
          UrlFetchApp.fetch(url, this.makeOptions(variants)).getContentText()
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

  private makeOptions = (
    variants: Variants
  ): GoogleAppsScript.URL_Fetch.URLFetchRequestOptions => {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    }

    const payload = (): string => {
      if (variants.size === 1) {
        return JSON.stringify({
          product: { stocks: variants.get('-') }
        })
      }

      const list: { option1_value: string; stocks: number }[] = []
      variants.forEach((quantity, key) => {
        list.push({ option1_value: key, stocks: quantity })
      })

      return JSON.stringify({
        product: { variants: list }
      })
    }

    return {
      method: 'put',
      payload: payload(),
      headers: headers,
      muteHttpExceptions: true
    }
  }
}
