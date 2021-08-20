<template>
  <div v-if="meta.valid && message !== ''"  class="field-help-message success-message">
    <span >{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'SuccessMessage',
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
