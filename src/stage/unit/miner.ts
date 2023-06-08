import type { MapChunk } from "../map/chunk"
import { ResourcePoint } from "../map/resource"
import { StageObject } from "../object"
import { Map } from "../map/map"
import { Inventory, InventorySlot } from "../inventory/inventory"

/**
 * Resource Miner
 *
 * Behaviour: Produce resource every 30 tick (Upgradable)
 *
 * Requirement: Place in map chunk slot 1, slot 0 must be a resource point.
 *
 * Party: Friendly, Controllable
 */
export class ResourceMiner extends StageObject {
  public level = 1

  public get valid(): boolean {
    const chunk = this.parent as MapChunk
    if (chunk.children.length < 2) {
      return false
    } else if (!(chunk.children[0] instanceof ResourcePoint)) {
      return false
    } else {
      return true
    }
  }

  public get product(): string {
    const chunk = this.parent as MapChunk
    if (this.valid) {
      return (chunk.children[0] as ResourcePoint).resource
    } else {
      throw new Error("Invalid miner, isn't place in a resource point.")
    }
  }

  public get outputCount(): number {
    // Every level produce 2 more resource
    return 10 + (this.level - 1) * 2
  }

  private countdown = 30
  private get maxCountdown(): number {
    // Every level reduce 1 tick countdown
    return 30 - Math.min(Math.max((this.level - 1) * 1, 0), 25)
  }

  constructor(chunk: HTMLElement) {
    super()
    this.visible = true
    this.mountElement(chunk)
  }

  render() {
    if (this.element) {
      this.element.style.position = "absolute"
      this.element.style.bottom = "0"
      this.element.style.left = "0"
      this.element.style.width = `${Map.chunkSize}px`
      this.element.style.textAlign = "right"
      this.element.style.fontSize = "16px"
      this.element.style.padding = "0 6.75px"
      this.element.innerHTML = `<span class="mdi mdi-pickaxe"></span>`
      if(!this.valid) {
        this.element.style.color = "#f44336"
      }
    }
  }

  update() {
    if (this.countdown > 0) {
      this.countdown--
    } else {
      if (this.valid) {
        new Inventory().addItem(new InventorySlot(this.product, this.outputCount))
        this.emitEvent("codingland.produce.resource", this.product, this.outputCount)
      }
      this.countdown = this.maxCountdown
    }
  }
}
