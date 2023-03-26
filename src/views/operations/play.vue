<template>
  <q-page>
    <q-splitter v-model="splitters[0]" style="height: calc(100vh - 64px); width: 100%">
      <template v-slot:before>
        <q-splitter v-model="splitters[1]" horizontal>
          <template v-slot:before>
            <q-bar>
              <div>Game Scene</div>
              <q-space />
              <q-btn dense flat icon="mdi-play" v-if="pid === -1" @click="start" />
              <q-btn dense flat icon="mdi-pause" v-else @click="pause" />
            </q-bar>
            <div class="flex justify-center items-center" style="height: calc(100% - 32px)">
              <div>
                <div id="scene" />
                <q-popup-proxy :target="details.element" :model-value="details.info != null">
                  <div>
                    <q-banner>
                      <div class="text-bold">Material</div>
                      <div>{{ details.info?.material.id }}</div>
                      <div class="text-bold">Position</div>
                      <div>{{ details.info?.position.x }}, {{ details.info?.position.y }}</div>
                      <div class="text-bold">Temperature</div>
                      <div>{{ details.info?.material.temperature.toString("celsius") }}C</div>
                      <div class="text-bold">Mass</div>
                      <div>{{ details.info?.material.mass }}kg</div>
                      <div class="text-bold">Durability</div>
                      <div>{{ details.info?.material.durability }}%</div>
                      <div class="text-bold">Hardness</div>
                      <div v-if="focus.robot != null">
                        EST
                        {{ focus.robot.calculateDiggingEst(details.info?.material, details.info?.material.durability) }}
                        Ticks
                      </div>
                      <div>{{ details.info?.material.prototype.constructor.attributes.hardness }}</div>

                      <div class="q-mt-sm" v-if="details.info?.entities.length > 0">
                        <div class="text-bold">Entities</div>
                        <div v-for="(entity, i) in details.info?.entities" :key="i">
                          <div class="text-bold text-capitalize">{{ entity.name }}&nbsp;{{ entity.facing }}</div>
                          <div>{{ entity.id }}</div>
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
                  <q-btn dense flat icon="mdi-delete" @click="$instance.messages = []">
                    <q-tooltip>
                      Clear Console
                    </q-tooltip>
                  </q-btn>
                </q-bar>
                <q-virtual-scroll style="max-height: calc(100% - 36px)" :items="$instance.messages" separator
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

              <q-tab-panel class="q-pa-none" name="robots">
                <q-bar>Robots</q-bar>
                <q-virtual-scroll style="max-height: calc(100% - 36px)" :items="Object.values($instance.robots)"
                                  separator v-slot="{ item, index }">
                  <q-item clickable v-ripple :key="index" :active="focus.robot?.name === item.name" @click="focus.robot = item">
                    <q-item-section>
                      <q-item-label>
                        <span>{{ item.name }}</span>
                      </q-item-label>
                      <q-item-label caption>
                        <span>Battery {{ item.power }}kJ</span>&nbsp;
                        <span>Health {{ item.health }}%</span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-virtual-scroll>
              </q-tab-panel>

              <q-tab-panel class="q-pa-none" name="inventory">
                <q-bar>Inventory</q-bar>
                <materials-list class="q-pa-md" />
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
              <q-tab name="robots" label="Robots" />
              <q-tab name="inventory" label="Inventory" />
            </q-tabs>
          </template>
        </q-splitter>
      </template>
      <template v-slot:after>
        <q-bar>Editor</q-bar>
        <div v-if="focus.robot != null" style="height: calc(100% - 32px)">
          <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-show="pid === -1" style="height: 100%">
              <vue-monaco-editor
                language="javascript"
                v-model:value="focus.robot.script"
                style="height: 100%"
              />
            </div>
          </transition>

          <q-inner-loading :showing="pid !== -1">
            <q-spinner-gears size="50px" color="primary" />
            <span class="q-pt-md">You cannot edit code when game running.</span>
          </q-inner-loading>
        </div>
        <div v-else style="height: calc(100% - 32px); display: flex; justify-content: center; align-items: center">
          <div class="text-center">
            <q-icon name="mdi-alert" color="negative" size="56px" />
            <br>
            <span>Select a robot to edit its script</span>
          </div>
        </div>
      </template>
    </q-splitter>

    <q-bar>
      <div>GameEngine v1.1.5</div>
      <q-space />
      <q-btn flat dense icon="mdi-content-save" :disable="$engine.saved" @click="$engine.save()" />
    </q-bar>

    <q-dialog v-model="modals.finished" persistent>
      <finished v-if="$instance.alive" />
      <failed v-else />
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue"
import { useGameInstance } from "@/stores/instance"
import type { MapTile } from "@/libs/engine/map"
import { useRouter } from "vue-router"
import Finished from "@/views/operations/feedbacks/finished.vue"
import Failed from "@/views/operations/feedbacks/failed.vue"
import MaterialsList from "@/components/materials-list.vue"

const $router = useRouter()
const $engine = useGameInstance()
const $instance = useGameInstance().instance

const splitters = reactive([50, 50, 50])
const modes = reactive({ slide1: "console" })

const pid = ref(-1)
const focus = reactive<any>({ element: null, layer: 0, robot: null })
const details = reactive<any>({ element: false, info: null })
const modals = reactive({ finished: false })
const configuration = reactive({
  tile: { size: 20 }
})

let scene: HTMLDivElement

function render() {
  // Clear old render result
  while (scene?.firstChild) {
    scene.removeChild(scene.firstChild)
  }

  // Set height and width
  scene.style.width = `${configuration.tile.size * $instance.map.size.x}px`
  scene.style.height = `${configuration.tile.size * $instance.map.size.y}px`
  scene.style.fontSize = `${0}px`

  $instance.map.forEach((tile: MapTile) => {
    const tileElement = document.createElement("div")
    tileElement.id = `tiles-${tile.drawingId}`
    tileElement.style.backgroundColor = tile.material.prototype.constructor.style?.color
    tileElement.style.content = tile.material.prototype.constructor.style?.content
    tileElement.style.height = `${configuration.tile.size}px`
    tileElement.style.width = `${configuration.tile.size}px`
    tileElement.style.border = `${configuration.tile.size / 2 - tile.material.durability / 10}px solid black` // Display digging progress
    tileElement.className = "element-tiles"
    for (const entity of tile.entities) {
      const entityElement = document.createElement("div")
      entityElement.id = `tiles-${entity.drawingId}`
      entityElement.style.backgroundColor = entity.prototype.constructor.style?.color
      entityElement.style.content = tile.material.prototype.constructor.style?.content
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
    scene.append(tileElement)
  })
}

function start() {
  pid.value = $instance.start()
}

function pause() {
  $instance.pause(pid.value)
  pid.value = -1
}

onMounted(() => {
  // Setup rendering
  scene = document.getElementById("scene") as HTMLDivElement

  // First time render
  render()
})

watch($instance, () => {
  render()

  if ($instance.state !== "playing") {
    $router.push({ name: "dashboard" })
  }

  if (!$instance.alive || $instance.finished) {
    modals.finished = true
    if (pid.value !== -1) {
      pause()
    }
  }
}, { deep: true })
</script>

<style scoped>
#scene {
  display: flex;
  flex-wrap: wrap;
}
</style>