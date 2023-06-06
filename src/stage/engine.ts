import { StageObject } from "./object"

// Lifecycle update delay.
export const CLOCK_RATE = 100

export class StageEngine {
  public rootNode: StageObject

  private ticker?: number
  private hooks: { [id: string]: any } = {}

  constructor() {
    if(CLOCK_RATE < 100) {
      console.warn("[Stage.js] WARNING: CLOCK RATE IS TOO FAST, MAY CAUSE BROWSER AND PAGE LAG")
    }

    this.rootNode = new StageObject()
  }

  get running() {
    return this.ticker != null
  }

  addEventListener(id: string, callback: any) {
    this.hooks[id] = callback
  }

  foreachEventListeners(id: string, callback: (func: any) => void) {
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
