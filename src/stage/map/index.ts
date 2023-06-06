import { StageObject, Vector } from "../object"
import { ResourcePoint } from "./resource"
import { MapChunk } from "./chunk"
import { EnemyEntrance } from "./entrance"
import { Entity } from '../entity/index';

export class Map extends StageObject {
  public static chunkSize: number = 96

  public size = new Vector()

  constructor(size = new Vector(8, 5)) {
    super()
    this.size.x = size.x ?? 8
    this.size.y = size.y ?? 5
    this.visible = true
    this.element?.classList.add("sgT-map")
    this.mountElement(document.getElementById("sgT-map-wrapper") as HTMLElement)

    // Add signal listener
    this.addSignalListener("codingland.spawn.enemy", (pos: Vector) => {
      const entity = new Entity(this.element as HTMLElement)
      entity.position = pos
      this.addChild(entity)
    })

    // Follow size to create chunks
    let total = 0
    console.log("[Map Creator] Start initialization map chunks...")
    for (let x = 0; x < this.size.x; x++) {
      for (let y = 0; y < this.size.y; y++) {
        const chunk = new MapChunk(new Vector(x, y))

        if (Math.random() > 0.75) {
          chunk.addChild(new ResourcePoint(chunk.element as HTMLElement, "codingland.wood"))
        }

        this.addChild(chunk)
        console.debug(`[Map Creator] Created a map chunk at: (${x}, ${y}).`)
        total++
      }
    }

    // Append additional components
    const additional = { entrance: this.getChunk(Vector.rangeRandom(0, this.size.x, 0, this.size.y)) }
    additional.entrance.replaceChild(0, new EnemyEntrance(additional.entrance.element as HTMLElement))

    console.log(`[Map Creator] Finish map chunk initialization, total created ${total} chunks.`)
  }

  getChunk(position: Vector): MapChunk {
    return this.children.filter((child) => child.position.equals(position))[0]
  }

  render() {
    if (this.element) {
      this.element.style.width = `${Map.chunkSize * (this.size?.x ?? 8) + 2}px`
      this.element.style.height = `${Map.chunkSize * (this.size?.y ?? 5) + 2}px`
      this.element.style.border = "1px solid #e4e4e4"
      this.element.style.position = "relative"
    }
  }
}
