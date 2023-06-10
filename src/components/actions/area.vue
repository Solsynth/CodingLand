<template>
  <div>
    <v-list density="compact" class="sgt-inspector" lines="three">
      <v-list-subheader>BUILD</v-list-subheader>
      <v-text-field v-model="search" :rounded="0" variant="filled" density="compact" placeholder="Search..."
                    :hide-details="true" />
      <v-alert v-if="!props.attributes['buildable']" :rounded="0" type="warning" density="compact"
               text="Couldn't build here, it's occupied." />
      <v-list-item v-for="(item, i) in builds.filter(v => v.title.toLowerCase().includes(search.toLowerCase()))"
                   :key="i" :prepend-icon="item.icon" :disabled="!props.attributes['buildable']" :title="item.title"
                   @click="triggerCallback(item.action)">
        <template #subtitle>
          <div>{{ item.description }}</div>
          <div class="mt-2 d-flex" style="flex-wrap: wrap; gap: 4px">
            <v-badge inline color="primary" :content="`Cost ${parseCost(item.cost)}`" />
            <v-badge inline v-for="(tag, i) in item.tags" :key="i" :content="tag" />
          </div>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import type { StagePopupOptions } from "@/stage/object"
import { ref } from "vue"

const props = defineProps<StagePopupOptions>()
const emits = defineEmits(["close"])

const search = ref("")

function parseCost(cost: any): string {
  let response = []
  for (const [k, v] of Object.entries(cost)) {
    response.push(`${k}: ${v}`)
  }
  return response.join(", ")
}

const builds = [
  {
    icon: "mdi-wall",
    title: "Wall",
    description: "Block enemies get into your base",
    action: "build.wall",
    cost: { "codingland.wood": 20 },
    tags: ["Unpassable"]
  },
  {
    icon: "mdi-tower-fire",
    title: "Defender",
    description: "Attack enemies in a range",
    action: "build.defender",
    cost: { "codingland.wood": 160 },
    tags: ["Area of Effect"]
  }
]

function triggerCallback(id: string) {
  props.callbacks[id]()
  emits("close")
}
</script>