import { Entity, type LookupResult } from "./entity"
import { Map } from "../map/map"
import { Direction } from "../object"
import type { Unit } from "../unit/unit"
import { Base } from "@/stage/unit/base"

let lookupCache: { [x: number]: { [y: number]: LookupResult } } = {}

/**
 * Engineer
 *
 * Behaviour: Run to the building, then blow himself up and player buildings.
 *
 * Party: Hostile
 */
export class EnemyEngineer extends Entity {
  public type = "codingland.entities.enemies.engineer"
  public attributes = { party: "enemy" }

  public damage = 20.0
  public maxHealth = 20.0

  private ready = false
  private attacked: number | null = null

  public range = [Direction.Up, Direction.Left, Direction.Center, Direction.Right, Direction.Down]

  constructor(map: HTMLElement) {
    super(map)
    this.health = this.maxHealth
    this.element?.classList.add("sgt-entity-enemy")
  }

  get texture(): string {
    return `<span class="mdi mdi-account-hard-hat" style="color: white"></span>`
  }

  private moveCountdown = 20
  private maxMoveCountdown = 20

  mount() {
    // Cleanup cache when layout change
    this.addEventListener("codingland.maps.layouts.update", () => {
      if (Object.entries(lookupCache).length > 0) {
        lookupCache = {}
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

    // Lookup all player building
    const target = map.lookupChunk((chunk) => {
      return chunk.children[0] instanceof Base || chunk.children.filter(o => {
        return o.attributes.party === "player" && !o.attributes.invincible
      }).length > 0
    }).map(o => o.position)

    // Lookup path to nearest player building
    const next = await this.lookupPath((chunk) => {
      return chunk == null
    }, ...target)
    if (pos.x && pos.y) lookupCache[pos.x][pos.y] = next
    this.direction = next.nextDirection
    return next.success
  }

  attack() {
    const map = this.parent as Map
    for (const direction of this.range) {
      const pos = this.position.floor().add(direction)
      const targets = map.getChunk(pos)?.children.filter(o => {
        return o.attributes.party === "player" && !o.attributes.invincible
      }) ?? []
      for (const target of targets) {
        (target as Unit).takeDamage(this.damage)
      }
    }
  }

  dispose() {
    clearTimeout(this.attacked ?? -1)
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

    if (!this.attacked) {
      const map = this.parent as Map
      for (const direction of this.range) {
        const pos = this.position.floor().add(direction)
        if (map.getChunk(pos)?.children.filter(o => {
          return o.attributes.party === "player" && !o.attributes.invincible
        }).length > 0) {
          if (this.element) {
            // Play animation
            this.element.classList.add("sgt-engineer-explosion")
            this.attacked = setTimeout(() => {
              // After animation do damage
              this.attack()
              this.dispose()
            }, 650)
          }
          break
        }
      }
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
