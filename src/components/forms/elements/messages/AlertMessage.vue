<template>
  <div v-if="message" class="vee-helper v-secondary alert-message">
    <span class="alert-message">{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
    meta: {
      type: Object,
      required: true,
    },
  },
  setup() {

  }
}
</script>
