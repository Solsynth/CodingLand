import { StageObject, Vector } from "../object"
import { Map } from "."

export class EnemyEntrance extends StageObject {
  constructor(chunk: HTMLElement) {
    super()
    this.visible = true
    this.mountElement(chunk)
  }

  get texture(): string {
    return `<span class="mdi mdi-login-variant" style="color: #f44336"></span>`
  }

  private countdown = 0

  update() {
    if (this.countdown > 0) {
      this.countdown--
    } else {
      const spawnLocation = this.parent?.position?.clone() as Vector
      spawnLocation.x = (spawnLocation.x ?? 0) + 0.25
      spawnLocation.y = (spawnLocation.y ?? 0) + 0.25

      this.emitSignal("codingland.spawn.enemy", spawnLocation)
      this.countdown = 60
    }
  }

  render() {
    if (this.element) {
      this.element.style.width = `${Map.chunkSize}`
      this.element.style.height = `${Map.chunkSize}`
      this.element.style.userSelect = "none"
      this.element.style.fontSize = "32px"
      this.element.innerHTML = this.texture
    }
  }
}
