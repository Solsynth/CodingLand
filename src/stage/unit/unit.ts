import { StageObject } from "../object"

/**
 * CodingLand Unit Base Class.
 * Easy to build a unit(building) by extend it then mount under the map chunk object.
 *
 * Based by Stage.js StageObject class
 */
export class Unit extends StageObject {
  public health: number
  public maxHealth = 100

  takeDamage(damage: number) {
    this.health -= damage
    if (this.element) {
      if (this.element.hasAttribute("under-attack-mask")) {
        clearTimeout(parseInt(this.element.getAttribute("under-attack-mask") as string))
      }
      const cleaner = setTimeout(() => this.element?.removeAttribute("under-attack-mask"), 250)
      this.element.setAttribute("under-attack-mask", cleaner.toString())
    }
  }

  update() {
    if(!this.attributes?.invincible && this.health <= 0) {
      this.dispose()
    }
  }

  constructor() {
    super()
    this.health = this.maxHealth
  }
}