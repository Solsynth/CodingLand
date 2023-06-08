<template>
  <v-container fluid class="pa-0 fit-height">
    <div id="sgt-stage" class="fit-width" style="height: calc(100vh - 64px)">
      <div id="sgt-map-wrapper" class="fit-width fit-height"></div>
    </div>

    <div class="sgt-console sgt-console-inventory">
      <v-row dense>
        <v-col :cols="12">
          <v-card>
            <v-card-text>
              <div><b>Inventory</b></div>
              <div style="font-size: 10px">
                <!-- Noting -->
                <div v-if="inventory.length <= 0">Empty</div>
                <!-- List -->
                <div v-for="(v, i) in inventory" :key="i">
                  <div>{{ v.id }} {{ v.amount }}</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col :cols="12">
          <v-card>
            <v-card-text>
              <div><b>Recent</b></div>
              <div style="font-size: 10px">
                <!-- Noting -->
                <div v-if="Object.entries(recent).length <= 0">No Income & Expenses</div>
                <!-- List -->
                <div v-for="(v, i) in Object.entries(recent)" :key="i">
                  <div>{{ v[0] }} {{ v[1].value }}</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useStage } from "@/stores/stage"
import { Map } from "@/stage/map/map"
import { useRouter } from "vue-router"

const recent = ref<{ [id: string]: { negative: boolean; value: string } }>({})
const inventory = ref<any>([])

const $stage = useStage()
const $router = useRouter()

watch($stage.inventory, (v) => {
  console.log(v)
})

onMounted(() => {
  const wrapper = document.getElementsByClassName("sgt-stage")[0] as HTMLElement

  if ($stage.instance != null) {
    $stage.instance.rootNode.addChild(new Map())
    $stage.instance.start()

    $stage.eventbus.addListener("codingland.inventory.refresh", (v: any, w: any) => {
      inventory.value = w
      recent.value = v
    })
  } else {
    console.error("Launcher isn't finish their work. Game play disabled.")
    console.error("Now auto redirecting to launcher...")

    $router.push({ name: "main.menu.launcher" })
  }
})

onUnmounted(() => {
  $stage.instance?.pause()
  $stage.instance = null
})
</script>

<style>
#sgt-stage {
  position: relative;
}

#sgt-map-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  place-items: center;
  left: 0;
  top: 0;
}

.sgt-console {
  font-family: "Roboto Mono", monospace;
  font-size: 12px;
  min-width: 280px;
  position: absolute;
  bottom: 12px;
  left: 12px;
}

.sgt-entity {
  transition: all 0.1s;
}
</style>
