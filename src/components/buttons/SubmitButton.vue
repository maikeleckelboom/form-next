<template>
  <fieldset class="field-wrapper" style="pointer-events: none;">
    <PrimaryButton :text="text" :type="type" v-bind="$attrs"/>
  </fieldset>
</template>

<script>
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";

export default {
  name: 'SubmitButton',
  components: {PrimaryButton},
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'submit',
    },
  },
}
</script>
