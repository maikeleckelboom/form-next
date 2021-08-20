<template>
  <div class="optional-field-wrapper">

    <!-- Checkbox with question for optional fields group -->
<!--    <CheckboxInput name="test" label="test" value="test" />-->


  </div>
</template>

<script>
import CheckboxField from "@/components/forms/elements/CheckboxField.vue";

export default {
  name: 'OptionalFieldWrapper',
  components: {CheckboxField},
  setup() {

  },
  props: {},
}
</script>

<style lang="scss">
@import "./src/scss/abstracts";


</style>
