import { CLOCK_RATE } from "../engine"
import { StageObject, Vector } from "../object"
import { Map } from "../map/map"

export class Entrance extends StageObject {
  public type = "codingland.buildings.entrance"
  public attributes = {}

  constructor(chunk: HTMLElement) {
    super()
    this.visible = true
    this.mountElement(chunk)
  }

  get texture(): string {
    return `<span class="mdi mdi-logout-variant" style="color: #f44336"></span>`
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
    element.className = "sgt-entrance-progress"
    element.innerText = this.delay > 0 ? "Reload..." : `${((this.countdown * CLOCK_RATE) / 1000).toFixed(1)}s`
    return element
  }

  private countdown = 60
  private maxCountdown = 60
  // Delay after finish once spawn
  private delay = 10

  update() {
    if (this.delay <= 0) {
      if (this.countdown > 0) {
        this.countdown--
      } else {
        const spawnLocation = this.parent?.position?.clone() as Vector
        spawnLocation.x = (spawnLocation.x ?? 0) + 0.25
        spawnLocation.y = (spawnLocation.y ?? 0) + 0.25

        // TODO Add HUD to display spawner status
        this.emitEvent("codingland.spawn.enemy", spawnLocation)
        this.countdown = this.maxCountdown
        this.delay = 10
      }
    } else {
      this.delay--
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
