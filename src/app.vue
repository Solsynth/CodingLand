<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="mdi-menu" @click="layouts.drawer.left = !layouts.drawer.left" />

        <q-toolbar-title>CodingLand</q-toolbar-title>
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

const layouts = useLayoutOptions().options
</script>