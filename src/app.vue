<template>
  <div id="root">
    <router-view />

    <snackbar />
  </div>
</template>

<script lang="ts" setup>
import Snackbar from "@/components/global/snackbar.vue";
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.fit-height {
  height: 100%;
}

.fit-width {
  width: 100%;
}

.splitpanes__splitter {
  background-color: #e4e4e4;
  position: relative;
}

.splitpanes__splitter:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  background-color: #e4e4e4;
  opacity: 0;
  z-index: 1;
}

.splitpanes--vertical>.splitpanes__splitter:before {
  left: -5px;
  right: -5px;
  height: 100%;
}

.splitpanes--horizontal>.splitpanes__splitter:before {
  top: -5px;
  bottom: -5px;
  width: 100%;
}
</style>