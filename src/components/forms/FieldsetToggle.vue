<template>
  <div class="fieldset-toggle-component field-wrapper checkbox">
    <div class="field-checkbox">
      <div class="checkbox-item"
           :class="{'checked': selected === valueInactive}">
        <input v-model="selected  "
               :value="valueInactive"
               :id="`${valueInactive}-${uid}`"
               type="radio"
               :name="`optional-fieldset-group-${uid}`"
               tabindex="0"/>
        <label :for="`${valueInactive}-${uid}`" class="custom-radio">
          <span>{{ valueInactive }}</span>
        </label>
      </div>
      <div class="checkbox-item"
           :class="{'checked': selected === valueActive}">
        <input v-model="selected"
               :value="valueActive"
               :id="`${valueActive}-${uid}`"
               type="radio"
               :name="`optional-fieldset-group-${uid}`"
               tabindex="0"/>
        <label :for="`${valueActive}-${uid}`" class="custom-radio">
          <span>{{ valueActive }}</span>
        </label>
      </div>
    </div>
    <div v-show="selected === valueActive" class="control">
      <slot/>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {generateUniqueID} from '@/mixins'

export default {
  name: 'FieldsetToggle',
  setup(props, context) {
    const uid = generateUniqueID();
    const selected = ref(props.value)

    return {
      uid,
      selected
    }
  },
  props: {
    valueActive: {
      required: true,
      type: String,
      default: 'active',
    },
    valueInactive: {
      required: true,
      type: String,
      default: 'inactive',
    },
    value: {
      required: true,
      type: String,
    }
  },
}
</script>

<style lang="scss">
//@import "./src/scss/abstracts";

.fieldset-toggle-component {
  .field-checkbox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.375rem;
  }
}
</style>
