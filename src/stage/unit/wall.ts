import { Map } from "../map/map"
import { StageObject, type StagePopupOptions } from "../object"
import { MapChunk } from "@/stage/map/chunk"

export class Wall extends StageObject {
  public type = "codingland.buildings.wall"
  public attributes = { party: "player", passable: false }
  public level = 1

  public health: number
  public maxHealth = 100

  constructor(chunk: HTMLElement) {
    super()
    this.health = this.maxHealth
    this.visible = true
    this.mountElement(chunk)
  }

  get texture(): string {
    return `<span class="mdi mdi-wall"></span>`
  }

  mount() {
    // Map layout changed
    this.emitEvent("codingland.maps.layouts.update")
  }

  dispose() {
    // Map layout changed
    this.emitEvent("codingland.maps.layouts.update")
    super.dispose()
  }

  renderActions(): StagePopupOptions {
    const chunk = this.parent as MapChunk

    return {
      icon: this.texture,
      title: "Wall",
      content: () => import("@/components/actions/wall.vue"),
      subtitle: `Level ${this.level}`,
      caller: this,
      callbacks: {
        "destroy": () => {
          this.dispose()
          console.debug(`[Actions] Successfully destroy a wall at ${chunk.position.toString()}!`)
        }
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
    }
  }
}
