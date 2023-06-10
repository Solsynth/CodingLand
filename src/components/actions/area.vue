<template>
  <div>
    <v-list density="compact" class="flat-actions-list" lines="two">
      <v-list-subheader>BUILD</v-list-subheader>
      <v-text-field v-model="search" :rounded="0" variant="filled" density="compact" placeholder="Search..."
                    :hide-details="true" />
      <v-list-item v-for="(item, i) in builds.filter(v => v.title.includes(search))" :key="i" :prepend-icon="item.icon"
                   :disabled="!attributes['buildable']" :title="item.title" :subtitle="item.description"
                   @click="triggerCallback(item.action)" />
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import type { StagePopupOptions } from "@/stage/object"
import { ref } from "vue"

const props = defineProps<StagePopupOptions>()
const emits = defineEmits(["close"])

const search = ref("")

const builds = [
  { icon: "mdi-wall", title: "Wall", description: "Block enemies get into your base", action: "build.wall" }
]

function triggerCallback(id: string) {
  props.callbacks[id]()
  emits("close")
}
</script>

<style scoped>
.flat-actions-list .v-list-item {
  padding-bottom: 8px !important;
  padding-top: 8px !important;
}
</style>