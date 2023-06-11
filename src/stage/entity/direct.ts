import { Entity, type LookupResult } from "./entity"
import type { Vector } from "../object"
import { Map } from "../map/map"
import { Base } from "../unit/base"

let lookupTarget: Vector | null = null
let lookupCache: { [x: number]: { [y: number]: LookupResult } } = {}

/**
 * Direct Attacker
 *
 * Behaviour: Run into the base, won't attack others.
 *
 * Party: Hostile
 */
export class EnemyDirectAttacker extends Entity {
  public type = "codingland.entities.enemies.direct_attacker"
  public attributes = { party: "enemy" }

  public damage = 20.0
  public maxHealth = 40.0

  private ready = false

  constructor(map: HTMLElement) {
    super(map)
    this.health = this.maxHealth
    this.element?.classList.add("sgt-entity-enemy")
  }

  get texture(): string {
    return `<span class="mdi mdi-target-account" style="color: white"></span>`
  }

  private moveCountdown = 20
  private maxMoveCountdown = 20

  mount() {
    // Cleanup cache when layout change
    this.addEventListener("codingland.maps.layouts.update", () => {
      if (Object.entries(lookupCache).length > 0) {
        lookupCache = {}
        lookupTarget = null
      }
    })
  }

  async locate(): Promise<boolean> {
    const map = this.parent as Map
    const pos = this.position.floor()
    if (pos.x && lookupCache[pos.x] == null) {
      lookupCache[pos.x] = {}
    } else if (pos.x && pos.y && lookupCache[pos.x][pos.y] != null) {
      this.direction = lookupCache[pos.x][pos.y].nextDirection
      return true
    }

    if (!lookupTarget) {
      lookupTarget = map.lookupChunk((chunk) => {
        return chunk.children[0] instanceof Base
      })[0].position
    }

    const next = await this.lookupPath((chunk) => {
      return chunk == null || chunk.children[0]?.attributes?.passable === false
    }, lookupTarget)
    if (pos.x && pos.y) lookupCache[pos.x][pos.y] = next
    this.direction = next.nextDirection
    return next.success
  }

  dispose() {
    this.emitEvent("codingland.scoreboard.add", this.maxHealth)
    super.dispose()
  }

  update() {
    super.update()
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
