export class StockData {
  id: string
  quantity: number
  colorMeId: string

  constructor(id: string, quantity: number, colorMeId: string) {
    this.id = id
    this.quantity = quantity
    this.colorMeId = colorMeId
  }
}
