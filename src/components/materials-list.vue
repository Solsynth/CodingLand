<template>
  <div class="row q-gutter-col-md">
    <div class="col-2 text-center" v-for="([k, v], i) in list" :key="i">
      <q-avatar color="grey-5">{{ $t(`assets.${k}`).substring(0, 1).toUpperCase() }}</q-avatar>
      <div>{{ $t(`assets.${k}`) }} {{ v }}kg</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"
import { useGlobalData } from "@/stores/global"
import { computed } from "vue"

const props = defineProps({ global: Boolean })
const list = computed(() => props.global ? Object.entries($global.inventory) : Object.entries($instance.inventory))

const $global = useGlobalData()
const $instance = useGameInstance().instance
</script>