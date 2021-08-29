<template>
  <label v-bind="$attrs"
         class="smart-placeholder">
    <span class="label-text">
      {{ labelName }}
    </span>
  </label>
</template>

<script>
import {ref} from "vue";

export default {
  name: 'FieldLabel',
  props: {
    label: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    let labelName = ref(props.label)

    return {
      labelName,
    }
  }
}
</script>
