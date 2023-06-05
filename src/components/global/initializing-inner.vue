<template>
  <div id="gEd-loader" class="wrapper">
    <div :style="`min-width: ${props.width ?? '180px'}`">
      <v-card variant="flat" color="transparent">
        <v-card-text>
          <div>{{ props.label ?? "Initializing..." }}</div>
        </v-card-text>
      </v-card>

      <v-progress-linear :color="props.color" :indeterminate="props.value == null" :model-value="props.value" />
      <div v-if="props.details" class="text-caption text-grey mt-3">{{ props.details }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{color?: string, label?: string, details?: string, width?: string, value?: number}>()
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;

  text-align: center;
  display: flex;
  place-items: center;
  justify-content: center;

  transition: all 300ms;
}
</style>
