import type { GameInstance } from "@/libs/instance"

export class Task {
  id = "undefined"

  priority = 5

  data: any = {}

  callback?: (task: Task) => void

  constructor(priority = 5) {
    this.priority = this.priority * priority
  }

  // When the executable is false. Current task will skip in the loops.
  get executable() {
    return true
  }

  // Task operations
  action(instance: GameInstance) {
    if(!this.executable) {
      return
    }
  }
}

export function sortTasks(tasks: Task[]) {

}