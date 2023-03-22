<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="mdi-code-tags" @click="versions = !versions" />

        <q-toolbar-title>{{ versions ? "Alpha v0.0.4" : "CodingLand" }}</q-toolbar-title>
        <q-space />

        <q-btn dense flat round icon="mdi-github" href="https://github.com/SmartSheep-Studio/CodingLand" target="_blank" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="layouts.drawer.left" side="left" bordered>
    </q-drawer>

    <q-drawer v-model="layouts.drawer.right" side="right" bordered>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { useLayoutOptions } from "@/stores/layouts"
import { ref } from "vue"

const layouts = useLayoutOptions().options
const versions = ref(false)
</script>