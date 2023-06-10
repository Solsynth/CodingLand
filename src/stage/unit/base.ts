import { EnemyDirectAttacker } from "../entity/direct"
import type { MapChunk } from "../map/chunk"
import { Map } from "../map/map"
import { Unit } from "./unit"

export class Base extends Unit {
  public type = "codingland.buildings.base"
  // Here's invincible means it couldn't damage by engineer's explosion
  public attributes = { party: "player", invincible: true }

  constructor(chunk: HTMLElement) {
    super()
    this.health = this.maxHealth
    this.visible = true
    this.mountElement(chunk)
  }

  get texture(): string {
    return this.health > 0
      ? `<span class="mdi mdi-home" style="color: #3f51b5"></span>`
      : `<span class="mdi mdi-home-flood" style="color: #3f51b5"></span>`
  }

  get indicator(): HTMLElement {
    const element = document.createElement("div")
    element.style.position = "absolute"
    element.style.bottom = "0"
    element.style.left = "0"
    element.style.width = `${Map.chunkSize}px`
    element.style.textAlign = "center"
    element.style.fontSize = "12px"
    element.style.fontFamily = "'Roboto Mono', monospace"
    element.className = "sgt-base-healthbar"
    element.innerText = `${this.health.toPrecision(3)}%`
    return element
  }

  update() {
    super.update()
    const enemies = (this.parent?.parent as Map).getEntities((this.parent as MapChunk).position)
    for (const enemy of enemies) {
      // Enemy enter the base
      if (enemy instanceof EnemyDirectAttacker) {
        enemy.dispose()
        this.health -= enemy.damage
        this.emitEvent("codingland.damage.base", this.health, enemy.id)
      }
    }
  }

  render() {
    if (this.element) {
      this.element.style.width = `${Map.chunkSize}`
      this.element.style.height = `${Map.chunkSize}`
      this.element.style.userSelect = "none"
      this.element.style.fontSize = `${Map.chunkSize / 3}px`
      this.element.innerHTML = this.texture
      this.element.appendChild(this.indicator)
    }
  }
}
