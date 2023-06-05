import { StageObject } from "./object"

// Lifecycle update delay.
const CLOCK_RATE = 250

export class StageEngine {
  public rootNode: StageObject

  private ticker?: number

  constructor() {
    this.rootNode = new StageObject()
  }

  get running() {
    return this.ticker != null
  }

  start() {
    this.ticker = setInterval(() => {
      this.update(this.rootNode)
    }, CLOCK_RATE)
  }

  pause() {
    if (this.running) {
      clearInterval(this.ticker)
    }
  }

  private update(root: StageObject) {
    root.update()
    if (root.element) root.render()
    root.children.forEach((node) => {
      this.update(node)
    })
  }
}
