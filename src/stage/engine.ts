import { StageObject } from "./object"

// Lifecycle update delay.
const CLOCK_RATE = 250

export class StageEngine {
  public rootNode: StageObject

  private ticker?: number
  private hooks: { [id: string]: any } = {}

  constructor() {
    this.rootNode = new StageObject()
  }

  get running() {
    return this.ticker != null
  }

  addSignalListener(id: string, callback: any) {
    this.hooks[id] = callback
  }

  foreachSignalListener(id: string, callback: (func: any) => void) {
    Object.entries(this.hooks).forEach(([k, v]) => {
      if (k === id) {
        callback(v)
      }
    })
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
