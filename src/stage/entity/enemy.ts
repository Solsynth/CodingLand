import { Entity } from "./entity"
import { Map } from "../map/map"
import { BasementPosition } from "../map/basement"

export class Enemy extends Entity {
  public type = "codingland.entities.enemy"

  public damage = 4.0

  private ready = false

  constructor(map: HTMLElement) {
    super(map)
    this.element?.classList.add("sgt-entity-enemy")
  }

  get texture(): string {
    return `<span class="mdi mdi-target-account" style="color: white"></span>`
  }

  private moveCountdown = 20
  private maxMoveCountdown = 20

  async locate(): Promise<boolean> {
    const next = await this.lookupRoad(BasementPosition)
    this.direction = next.nextDirection
    return next.success
  }

  update() {
    if (this.moveCountdown > 0) {
      if (!this.ready) {
        this.locate().then((success) => (this.ready = success))
      }
      this.moveCountdown--
    } else {
      this.locate()
      this.move(this.direction)
      this.ready = false
      this.moveCountdown = this.maxMoveCountdown
    }
  }

  render(): void {
    if (this.element) {
      super.render()
      this.element.style.backgroundColor = "#f44336"
      this.element.style.userSelect = "none"
      this.element.style.fontSize = `${Map.chunkSize / 3}px`
      this.element.innerHTML = this.texture
    }
  }
}
