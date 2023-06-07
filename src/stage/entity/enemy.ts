import { Entity } from "./entity"
import { Map } from "../map/map"

export class Enemy extends Entity {
  public type = "codingland.entities.enemy"

  constructor(map: HTMLElement) {
    super(map)
    this.element?.classList.add("sgT-entity-enemy")
  }

  get texture(): string {
    return `<span class="mdi mdi-target-account" style="color: white"></span>`
  }

  private moveCountdown = 20
  private maxMoveCountdown = 20

  locate() {
    const map = this.parent as Map
  }

  update() {
    if(this.moveCountdown > 0) {
      this.moveCountdown--
    } else {
      this.locate()
      this.move(this.direction)
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
