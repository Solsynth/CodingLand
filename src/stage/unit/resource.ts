import { Map } from "../map/map"
import { StageObject, StagePopupOptions } from "../object"
import { ResourceMiner } from "@/stage/unit/miner"
import type { MapChunk } from "@/stage/map/chunk"

export class ResourcePoint extends StageObject {
  public type = "codingland.environments.resource"
  public attributes = {}

  public resource: string

  constructor(chunk: HTMLElement, resource: string) {
    super()
    this.resource = resource
    this.visible = true
    this.mountElement(chunk)
  }

  get texture(): string {
    switch (this.resource) {
      case "codingland.wood":
        return `<span class="mdi mdi-pine-tree-variant"></span>`
      default:
        return `<span class="mdi mdi-help-rhombus-outline"></span>`
    }
  }

  renderActions(): StagePopupOptions {
    const chunk = this.parent as MapChunk

    return {
      icon: this.texture,
      title: "Resource Point",
      content: () => import("@/components/actions/resource.vue"),
      subtitle: this.resource,
      caller: this,
      attributes: { established: chunk.children[1] instanceof ResourceMiner },
      callbacks: {
        "mine": () => {
          chunk.setChild(1, new ResourceMiner(chunk.element as HTMLElement))
          console.debug(`[Actions] Successfully deployed resource miner at ${chunk.position.toString()}!`)
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
