<template>
  <v-container fluid class="pa-0 fit-height">
    <div id="sgt-stage" class="fit-width" style="height: calc(100vh - 64px)">
      <div id="sgt-map-wrapper" class="fit-width fit-height"></div>
    </div>

    <div class="mission sgt-widget">
      <v-row dense style="width: 340px">
        <v-col :cols="12">
          <v-card>
            <v-card-text>
              <div><b>Mission Objective</b></div>
              <div style="font-size: 10px">
                <ul>
                  <li>Protect the base and try you best!</li>
                </ul>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="inventory sgt-widget">
      <v-row dense style="width: 340px">
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
                  <div v-if="v[1].negative" class="text-red">{{ v[0] }} -{{ v[1].value }}</div>
                  <div v-else class="text-green">{{ v[0] }} +{{ v[1].value }}</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-navigation-drawer v-model="actions.display" :scrim="false" temporary width="340" location="right"
                         class="sgt-widget elevation-2">
      <template #prepend>
        <v-list-item lines="two" :title="actions.opts.title" :subtitle="actions.opts.subtitle" class="border-b">
          <template #prepend>
            <v-avatar style="font-size: 24px">
              <div v-html="actions.opts.icon" />
            </v-avatar>
          </template>
        </v-list-item>
      </template>

      <component v-if="actions.content" :is="actions.content" v-bind="actions.opts" @close="actions.display = false" />

      <template #append>
        <v-list-item lines="one" title="Close" class="border-t" @click="actions.display = false">
          <template #prepend>
            <v-avatar>
              <v-icon style="font-size: 24px" color="red" icon="mdi-close" />
            </v-avatar>
          </template>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, watch } from "vue"
import { useStage } from "@/stores/stage"
import { Map } from "@/stage/map/map"
import type { StagePopupOptions } from "@/stage/object"
import { useRouter } from "vue-router"
import "@/assets/style/stage.css"

const recent = ref<{ [id: string]: { negative: boolean; value: string } }>({})
const inventory = ref<any>([])

const actions = reactive<any>({ display: false, content: null, opts: {} })

const $stage = useStage()
const $router = useRouter()

watch($stage.inventory, (v) => {
  console.log(v)
})

onMounted(() => {
  document.body.style.overflow = "hidden"

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        actions.display = false
        e.preventDefault()
        break
    }
  })

  if ($stage.instance != null) {
    $stage.instance.rootNode.addChild(new Map())
    $stage.instance.start()

    $stage.eventbus.addListener("codingland.inventory.refresh", (v: any, w: any) => {
      inventory.value = w
      recent.value = v
    })

    $stage.eventbus.addListener("codingland.popups.show.actions", async (opts: StagePopupOptions) => {
      actions.content = opts.content ? (await opts.content()).default : null
      actions.opts = opts
      actions.display = true
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

  document.body.style.overflow = "auto"
})
</script>

<style>
.card-bottom .v-overlay__content {
  bottom: 0;
  margin-bottom: 0;
  border-radius: 4px 4px 0 0;
}

.card-actions-group {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.card-actions-group .v-btn {
  text-transform: unset;
}

.mission {
  min-width: 280px;
  position: absolute;
  top: calc(12px + 64px);
  left: 12px;
}

.inventory {
  min-width: 280px;
  position: absolute;
  bottom: 12px;
  left: 12px;
}
</style>
