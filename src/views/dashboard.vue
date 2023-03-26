<template>
  <q-page padding>
    <div class="text-h6 text-center">Operation Terminal</div>
    <div class="indicator fit row no-wrap justify-center q-col-gutter-md q-py-md">
      <!-- TODO Replace indicator data with Goatworks -->
      <div class="col-3">
        <q-card flat bordered class="cursor-pointer" @click="modals.changelogs = true">
          <q-card-section>
            <div class="text-h6">Changelogs</div>
            <div class="text-subtitle2">
              Notification
              <q-icon name="mdi-bell-badge" />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat bordered class="cursor-pointer" @click="modals.tutorial = true">
          <q-card-section>
            <div class="text-h6">Getting Start</div>
            <div class="text-subtitle2">
              Tutorial
              <q-icon name="mdi-school" />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat bordered class="cursor-pointer" @click="modals.inventory = true">
          <q-card-section>
            <div class="text-h6">Inventory</div>
            <div class="text-subtitle2">
              Resources
              <q-icon name="mdi-package" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="fit row q-col-gutter-x-md">
      <div class="col-3">
        <basement />
      </div>
      <div class="col-6">
        <actions />
      </div>
    </div>

    <q-dialog v-model="modals.changelogs">
      <changelogs />
    </q-dialog>

    <q-dialog v-model="modals.tutorial">
      <tutorial />
    </q-dialog>

    <q-dialog v-model="modals.inventory">
      <inventory />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import Actions from "@/views/operations/actions.vue"
import Changelogs from "@/views/statistics/changelogs.vue"
import Tutorial from "@/views/statistics/tutorial.vue"
import Basement from "@/views/basement/overview.vue"
import Inventory from "@/views/statistics/inventory.vue"

const modals = reactive({ changelogs: false, tutorial: false, inventory: false })
</script>

<style scoped>
.q-card {
  padding: 0.5em;
}

.indicator .q-card {
  width: 100%;
  transition: all 300ms linear;
}

.indicator .q-card:hover {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12) !important;
  transition: all 300ms linear;
}
</style>