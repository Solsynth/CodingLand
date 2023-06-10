import { Direction, StageObject } from "../object"
import { Map } from "../map/map"
import type { MapChunk } from "@/stage/map/chunk"

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
export class Defender extends StageObject {
  public type = "codingland.buildings.defender"
  public attributes = { party: "player" }
  public level = 1

  public range = [
    Direction.UpRight, Direction.Up, Direction.UpLeft,
    Direction.Left, Direction.Center, Direction.Right,
    Direction.DownLeft, Direction.Down, Direction.DownRight
  ]

  constructor(chunk: HTMLElement) {
    super()
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

  attack() {
    const chunk = this.parent as MapChunk
    const map = this.parent?.parent as Map
    for (const direction of this.range) {
      const targets = map.getEntities(chunk.position.add(direction)).filter(o => o.attributes.party === "enemy")
      for (const target of targets) {
        target.health -= this.damage
        if (target.element) {
          if (target.element.hasAttribute("under-attack-mask")) {
            clearTimeout(parseInt(target.element.getAttribute("under-attack-mask") as string))
          }
          const cleaner = setTimeout(() => target.element?.removeAttribute("under-attack-mask"), 250)
          target.element.setAttribute("under-attack-mask", cleaner.toString())
        }
      }
    }
  }

  update() {
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