import { Direction, type StagePopupOptions } from "../object"
import type { MapChunk } from "../map/chunk"
import { Map } from "../map/map"
import { Unit } from "./unit"

/**
 * Defender ~~Windows Defender~~
 *
 * Behaviour: Every 30 tick attack 3x3 range enemies(with arrows)(upgradeable),
 *            attacked chunk display as red border in 1s.
 *            Enemies can pass it.
 *
 * Requirement: Place in map chunk slot 0.
 *
 * Party: Friendly, Controllable
 */
export class Defender extends Unit {
  public type = "codingland.buildings.defender"
  public attributes = { party: "player" }
  public level = 1

  public health: number
  public maxHealth = 20

  public range = [
    Direction.UpRight, Direction.Up, Direction.UpLeft,
    Direction.Left, Direction.Center, Direction.Right,
    Direction.DownLeft, Direction.Down, Direction.DownRight
  ]

  constructor(chunk: HTMLElement) {
    super()
    this.health = this.maxHealth
    this.visible = true
    this.mountElement(chunk)
  }

  private countdown = 30

  public get maxCountdown(): number {
    // Every level reduce 1 tick countdown
    return 30 - Math.min(Math.max((this.level - 1) * 1, 0), 25)
  }

  public get damage(): number {
    return 10 + (this.level - 1) * 10
  }

  get texture(): string {
    return `<span class="mdi mdi-tower-fire"></span>`
  }

  render() {
    if (this.element) {
      this.element.style.width = `${Map.chunkSize}`
      this.element.style.height = `${Map.chunkSize}`
      this.element.style.userSelect = "none"
      this.element.style.fontSize = `${Map.chunkSize / 3}px`
      this.element.innerHTML = this.texture
    }
  }

  renderActions(): StagePopupOptions {
    const chunk = this.parent as MapChunk

    return {
      icon: this.texture,
      title: "Defender",
      content: () => import("@/components/actions/defender.vue"),
      subtitle: `Level ${this.level}`,
      caller: this,
      attributes: {},
      callbacks: {
        "destroy": () => {
          this.dispose()
          console.debug(`[Actions] Successfully destroy a defender at ${chunk.position.toString()}!`)
        }
      }
    }
  }

  attack() {
    const chunk = this.parent as MapChunk
    const map = this.parent?.parent as Map
    for (const direction of this.range) {
      const targets = map.getEntities(chunk.position.add(direction)).filter(o => o.attributes.party === "enemy")
      for (const target of targets) {
        target.takeDamage(this.damage)
      }
    }
  }

  update() {
    super.update()
    if (this.countdown > 0) {
      this.countdown--
    } else {
      const chunk = this.parent as MapChunk
      const map = this.parent?.parent as Map
      for (const direction of this.range) {
        const pos = chunk.position.add(direction)
        if (map.getEntities(pos).filter(o => o.attributes.party === "enemy").length > 0) {
          this.attack()
          this.countdown = this.maxCountdown
          break
        }
      }
    }
  }
}