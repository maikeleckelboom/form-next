<template>
  <div>
    <button type="button" @click="handleChange(value)">
     {{ checked ? "checked" : "unchecked" }}
    </button>
  </div>
</template>

<script>
import { useField } from "vee-validate";
import {ref} from 'vue'
export default {
  name: 'CheckboxInput',
  props: {
    modelValue: {
      type: null,
    },
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      required: false,
      default: undefined
    },
    value: {
      type: String,
    },
  },
  setup(props) {
    let value = ref(props.value)
    const { checked, handleChange } = useField(props.name, props.rules, {
      type: "checkbox",
      checkedValue: props.value,
    });
    handleChange(props.value);
    return {
      checked,
      handleChange,
      value
    };
  },
};
</script>

<style scoped>
button {
  background: none;
  border: none;
  font-size: 22px;
}
</style>
