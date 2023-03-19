<template>
  <q-page>
    <q-splitter v-model="splitters[0]" style="height: calc(100vh - 50px); width: 100%">
      <template v-slot:before>
        <q-splitter v-model="splitters[1]" horizontal>
          <template v-slot:before>
            <q-bar>Game Scene</q-bar>
            <div class="flex justify-center items-center" style="height: calc(100% - 32px)">
              <div>
                <div id="scene" />
                <q-popup-proxy :target="details.element" :model-value="details.info != null">
                  <div>
                    <q-banner>
                      <div class="text-bold">Material</div>
                      <div>{{ details.info?.material.type }}</div>
                      <div class="text-bold">Position</div>
                      <div>{{ details.info?.position.x }}, {{ details.info?.position.y }}</div>
                      <div class="text-bold">Temperature</div>
                      <div>{{ details.info?.material.temperature.toString("kelvin") }}K</div>
                      <div class="text-bold">Mass</div>
                      <div>{{ details.info?.mass }}kg</div>

                      <div class="q-mt-sm" v-if="details.info?.entities.length > 0">
                        <div class="text-bold">Entities</div>
                        <div v-for="(entity, i) in details.info?.entities" :key="i">
                          <div class="text-bold">{{ entity.name }}</div>
                          <div>
                            {{ entity.type }}
                            {{
                              entity.facing === "north" ?
                                "↑" : entity.facing === "south" ?
                                  "↓" : entity.facing === "west" ? "←" : "→"
                            }}
                            ({{ entity.health }}%)
                            {{ focus.robot?.name === entity.name ? "√" : "" }}
                          </div>
                          <div v-if="i >= 1" class="q-mb-md" />
                        </div>
                      </div>
                    </q-banner>
                  </div>
                </q-popup-proxy>
              </div>
            </div>
          </template>
          <template v-slot:after>
            <q-tab-panels style="height: calc(100% - 37px)" v-model="modes.slide1" animated>
              <q-tab-panel class="q-pa-none" name="console">
                <q-bar>
                  <div>Console</div>
                  <q-space />
                  <q-btn dense flat icon="mdi-delete" @click="$instance.console.messages = []">
                    <q-tooltip>
                      Clear Console
                    </q-tooltip>
                  </q-btn>
                </q-bar>
                <q-virtual-scroll style="max-height: calc(100% - 36px)" :items="$instance.console.messages" separator
                                  v-slot="{ item, index }">
                  <q-item :key="index" dense>
                    <q-item-section avatar>
                      <q-icon v-if="item.level === 'debug'" name="mdi-bug" />
                      <q-icon v-if="item.level === 'info'" name="mdi-information" />
                      <q-icon v-if="item.level === 'warning'" name="mdi-alert" />
                      <q-icon v-if="item.level === 'error'" name="mdi-alert-circle" />
                      <q-icon v-if="item.level === 'fatal'" name="mdi-close-circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ item.message }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-virtual-scroll>
              </q-tab-panel>

              <q-tab-panel class="q-pa-none" name="inventory">
                <q-bar>Inventory</q-bar>
                <q-virtual-scroll style="max-height: calc(100% - 36px)" :items="Object.entries($instance.map.inventory)"
                                  separator v-slot="{ item, index }">
                  <q-item :key="index" dense>
                    <q-item-section>
                      <q-item-label>{{ item[0] }}</q-item-label>
                      <q-item-label caption>{{ item[1] }}kg</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-virtual-scroll>
              </q-tab-panel>
            </q-tab-panels>

            <q-separator />

            <q-tabs
              v-model="modes.slide1"
              dense
              :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
              align="justify"
              narrow-indicator
            >
              <q-tab name="console" label="Console" />
              <q-tab name="inventory" label="Inventory" />
            </q-tabs>
          </template>
        </q-splitter>
      </template>
      <template v-slot:after>
        <q-bar>Editor</q-bar>
      </template>
    </q-splitter>
  </q-page>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, watch } from "vue"
import { useGameInstance } from "@/stores/instance"
import { EntityTypes } from "@/libs/entity"
import { v4 as uuidv4 } from "uuid"

const $instance = useGameInstance()

const splitters = reactive([50, 50, 50])
const modes = reactive({ slide1: "console" })

const focus = reactive<any>({ element: null, layer: 0, position: null, robot: null })
const details = reactive<any>({ element: false, info: null })
const configuration = reactive({
  tile: { size: 20 }
})

let sense: HTMLDivElement

function render() {
  // Clear old render result
  while (sense?.firstChild) {
    sense.removeChild(sense.firstChild)
  }

  // Set height and width
  sense.style.width = `${configuration.tile.size * $instance.map.size.x}px`
  sense.style.height = `${configuration.tile.size * $instance.map.size.y}px`
  sense.style.fontSize = `${0}px`

  $instance.map.forEach((tile) => {
    const tileElement = document.createElement("div")
    tileElement.id = `tiles-${uuidv4()}`
    tileElement.style.backgroundColor = tile.material.getColor()
    tileElement.style.height = `${configuration.tile.size}px`
    tileElement.style.width = `${configuration.tile.size}px`
    tileElement.className = "element-tiles"
    for (const entity of tile.entities) {
      const entityElement = document.createElement("div")
      tileElement.id = `tiles-${uuidv4()}`
      entityElement.style.backgroundColor = entity.getColor()
      entityElement.style.height = `${configuration.tile.size}px`
      entityElement.style.width = `${configuration.tile.size}px`
      entityElement.style.borderRadius = "50%"
      entityElement.style.position = "absolute"
      entityElement.className = "entity-tiles"
      tileElement.append(entityElement)
    }
    tileElement.addEventListener("mouseover", () => {
      details.element = `#${tileElement.id}`
      details.info = tile
    })
    tileElement.addEventListener("mouseout", () => {
      details.element = false
      details.info = null
    })
    tileElement.addEventListener("click", () => {
      focus.element = `#${tileElement.id}`
      if (tile.entities.length > 0) {
        if (focus.element !== `#${tileElement.id}`) {
          focus.layer = 0
        }
        const robots = tile.entities.filter((v) => v.type == EntityTypes.ROBOT)
        if (robots.length > 0) {
          focus.position = tile.position
          focus.robot = robots[focus.layer]
          focus.layer = robots.length <= focus.layer + 1 ? focus.layer : focus.layer + 1
          $instance.log("info", `You are controlling the robot ${focus.robot.name}`)
        }
      } else {
        $instance.log("info", `You no longer control the robot ${focus.robot.name}`)
        focus.robot = null
        focus.position = null
      }
    })
    sense.append(tileElement)
  })
}

onMounted(() => {
  // Setup rendering
  sense = document.getElementById("scene") as HTMLDivElement

  // First time render
  render()

  // Keyboard listener
  document.addEventListener("keyup", (event) => {
    // Keyboard control robot events
    if (focus.robot != null) {
      let status: boolean = false
      switch (event.key.toLowerCase()) {
        case "w":
          [$instance.map, focus.position, status] = focus.robot.move($instance.map, focus.position, {
            x: -1,
            y: 0
          }, "north")
          break
        case "a":
          [$instance.map, focus.position, status] = focus.robot.move($instance.map, focus.position, {
            x: 0,
            y: -1
          }, "west")
          break
        case "s":
          [$instance.map, focus.position, status] = focus.robot.move($instance.map, focus.position, {
            x: 1,
            y: 0
          }, "south")
          break
        case "d":
          [$instance.map, focus.position, status] = focus.robot.move($instance.map, focus.position, {
            x: 0,
            y: 1
          }, "east")
          break
        case " ":
          [$instance.map, status] = focus.robot.dig($instance.map, focus.position)
          break
      }
      !status && $instance.log("warning", "Control robot execute operation failed")
    }
  })
})

watch($instance.map, () => {
  render()
}, { deep: true })
</script>

<style scoped>
#scene {
  display: flex;
  flex-wrap: wrap;
}
</style>