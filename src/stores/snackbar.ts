import { defineStore } from "pinia"
import { ref } from "vue"

export interface ISnackbarOption {
  color?: string
  variant?: string
  disabled?: boolean
  height?: string | number
  width?: string | number
  location?: string
  rounded?: string | number | boolean
  timeout?: string | number
  theme?: string
  vertical?: boolean
  zIndex?: number
  text: string
}

export const useSnackbar = defineStore("snackbar", () => {
  const display = ref(false)
  const option = ref<ISnackbarOption>()

  function show(o: ISnackbarOption) {
    option.value = o
    option.value.timeout = option.value.timeout ?? 3000
    display.value = true
  }

  return { display, option, show }
})