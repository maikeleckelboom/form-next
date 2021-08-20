<template>
  <div v-if="message" class="vee-helper v-primary context-message">
    <span class="context-message">{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'ContextMessage',
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
}
</script>
