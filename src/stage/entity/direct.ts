import { Entity, type LookupResult } from "./entity"
import { Map } from "../map/map"
import { BasementPosition } from "../unit/basement"

// TODO Cleanup cache when map layout change
const lookupCache: { [x: number]: { [y: number]: LookupResult } } = {}

/**
 * Direct Attacker
 * 
 * Behaviour: Run into the basement, won't attack others.
 * 
 * Party: Hostile
 */
export class DirectAttacker extends Entity {
  public type = "codingland.entities.enemies.direct_attacker"

  public damage = 20.0

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
    const pos = this.position.floor()
    if (pos.x && lookupCache[pos.x] == null) {
      lookupCache[pos.x] = {}
    } else if (pos.x && pos.y && lookupCache[pos.x][pos.y] != null) {
      this.direction = lookupCache[pos.x][pos.y].nextDirection
      return true
    }

    const next = await this.lookupPath(BasementPosition)
    if (pos.x && pos.y) lookupCache[pos.x][pos.y] = next // Update cache
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
