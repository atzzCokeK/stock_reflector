import { StockData } from './StockData'

export class ColorMe {
  accessToken: string
  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  update = (stocks: StockData[]) => {}

  private makeUrl = (productId: string): string => `https://api.shop-pro.jp/v1/products/${productId}`
}
