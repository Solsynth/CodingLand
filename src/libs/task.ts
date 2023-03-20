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
    if (!this.executable) {
      return
    }
  }
}

export function sortTasks(tasks: Task[]) {
  tasks.sort((first, second) => {
    if (first.priority < second.priority) {
      return -1
    } else if (first.priority > second.priority) {
      return 1
    } else {
      return 0
    }
  })
}