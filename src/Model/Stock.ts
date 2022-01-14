export class Stock {
  id: number
  quantity: number
  colorMeId: number
  variant: string

  constructor(
    id: number,
    quantity: number,
    colorMeId: number,
    variant: string
  ) {
    this.id = id
    this.quantity = quantity
    this.colorMeId = colorMeId
    this.variant = variant
  }
}

export type Stocks = Set<Stock>
