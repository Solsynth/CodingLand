<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered>
      <q-bar dark class="bg-primary text-white">
        <q-btn dense flat icon="mdi-code-braces-box">
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item dense clickable :disable="$route.name !== 'play'">
                <q-item-section>Gameplay</q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-chevron-right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start" v-if="$route.name === 'play'">
                  <q-item dense clickable v-close-popup>
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                </q-menu>
              </q-item>
              <q-item dense clickable>
                <q-item-section>Help</q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-chevron-right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-item dense clickable v-close-popup href="https://wiki.smartsheep.studio/projects/codingland" target="_blank">
                    <q-item-section>Open Goatpedia...</q-item-section>
                  </q-item>
                </q-menu>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <div class="text-bold">CodingLand</div>

        <q-space />

        <div>{{ date }}</div>
      </q-bar>
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
import { computed } from "vue"

const layouts = useLayoutOptions().options
const date = computed(() => new Date().toLocaleTimeString())
</script>