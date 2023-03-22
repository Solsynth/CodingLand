import { Map } from "@/libs/engine/map"
import type { IMapGenerator } from "@/libs/engine/map-generator"
import { RobotEntity } from "@/libs/engine/entities/robot"

export type LoggerLevel = "debug" | "info" | "warning" | "error" | "fatal"

export class GameInstance {
  // Game map
  map: Map

  // Robots of the game
  get robots() {
    const robots: { [name: string]: RobotEntity } = {}
    this.map.forEach((tile) => {
      for (const entity of tile.entities) {
        if (entity instanceof RobotEntity) {
          robots[entity.name] = entity
        }
      }
    })
    return robots
  }

  // Game still playable
  get alive() {
    let alive = false
    for (const robot of Object.values(this.robots)) {
      if (robot.power > 0 && robot.health > 0) {
        alive = true
      }
    }
    return alive
  }

  // Player inventory
  inventory: { [id: string]: number } = {}

  // Messages in game
  messages: { level: LoggerLevel, message: string }[] = []

  // Game time
  inGameTime = 0

  // Game final score
  score = 0

  constructor(randomGenerator?: IMapGenerator) {
    this.map = new Map([], { x: 20, y: 20 })
    randomGenerator != null && this.newGame(randomGenerator)
  }

  newGame(randomGenerator: IMapGenerator) {
    randomGenerator.generate(this.map.size.x, this.map.size.y)
    randomGenerator.placeRobot(1).forEach((v) => {
      if (v instanceof RobotEntity) {
        this.robots[v.name] = v
      }
    })

    this.map.tiles = randomGenerator.tiles
  }

  start(): number {
    return setInterval(() => {
      // If game isn't playable, skip next tick computing.
      if (this.alive) {
        this.inGameTime++
        this.doUpdate()
      }
    }, 100)
  }

  pause(id: number) {
    clearInterval(id)
  }

  // Game Computing Loop Function
  doUpdate() {
    this.map.forEach((tile) => {
      tile.material.whenUpdate(this)
      for (const entity of tile.entities) {
        tile.whenUpdate(this)
        entity.whenUpdate(this)
        if (entity.tasks.length > 0) {
          if (entity.beforeExecuteTask(this, entity.tasks[0])) {
            entity.tasks[0].action(this)
          }
          if (entity.tasks[0].destroyable) {
            entity.tasks.splice(0)
          }
        }
      }
    })
  }
}