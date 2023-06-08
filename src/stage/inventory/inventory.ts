import { StageEventBus } from "../eventbus"

export class InventorySlot {
  public id: string
  public amount: number
  public attributes: any

  constructor(id: string, amount: number, attributes?: any) {
    this.id = id
    this.amount = amount
    this.attributes = attributes
  }
}

export class Inventory {
  private static instance: Inventory

  public warehouse: InventorySlot[] = []

  constructor() {
    if (!Inventory.instance) {
      Inventory.instance = this
    }
    return Inventory.instance
  }

  cleanup() {
    const cleaned: InventorySlot[] = []
    for(const slot of this.warehouse) {
      const duplicate = cleaned.filter(v => slot.id === v.id && slot.attributes === v.attributes)[0]
      const duplicateIndex = cleaned.indexOf(duplicate)
      if(duplicateIndex >= 0) {
        cleaned[duplicateIndex].amount += slot.amount
      } else {
        cleaned.push(slot)
      }
    }
    this.warehouse = cleaned
  }

  getItemAmount(id: string): number {
    let amount = 0
    this.getItem(id).forEach(slot => amount += slot.amount)
    return amount
  }

  getItem(id: string): InventorySlot[] {
    return this.warehouse.filter(slot => slot.id === id)
  }

  addItem(item: InventorySlot, clean = true) {
    this.warehouse.push(item)
    if(clean) this.cleanup()
    console.log(this.warehouse)
  }
}
