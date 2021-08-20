<template>
  <label v-bind="$attrs" class="smart-placeholder">
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'FieldLabel',
  props: {
    label: {
      type: String,
      required: true,
    }
  }
}
</script>
