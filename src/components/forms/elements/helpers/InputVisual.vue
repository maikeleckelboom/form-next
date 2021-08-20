<template>
  <Transition name="scale"
              class="input-visual feedback-visual">
    <img v-if="classList.valid"
         :src="checkmark"
         class="icon-feedback-field"
         alt="checkmark"
         key="valid">
    <img v-else-if="classList.invalid"
         :src="cross"
         class="icon-feedback-field"
         alt="cross"
         key="invalid">
  </Transition>
</template>
<script>
export default {
  name: 'InputVisual',
  props: {
    classList: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const cross = new URL('/assets/icons/form/crossed-red.svg', import.meta.url)
    const checkmark = new URL('/assets/icons/form/checkmark-green.svg', import.meta.url)
    return {
      cross,
      checkmark
    }
  },
}
</script>
