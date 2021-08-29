<template>
  <Transition name="fade-slide">
    <div v-if="focused && message && message.length"
         class="error-tooltip-message">
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ErrorTooltip',
  props: {
    message: {
      type: String,
      default: '',
    },
    focused: {
      type: Boolean,
      required: true,
    },
  },
  setup() {

  }
}
</script>
