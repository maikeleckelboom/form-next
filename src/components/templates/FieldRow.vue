<template>
  <div class="field-row">
    <div class="field-row-left grid-item" :class="`columns-${left}-${totalColumns}`">
      <slot name="left"/>
    </div>
    <div v-if="templateColumns.middle" class="field-row-middle grid-item"
         :class="`columns-${middle}-${totalColumns}`">
      <slot name="middle"/>
    </div>
    <div class="field-row-right grid-item" :class="`columns-${right}-${totalColumns}`">
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  name: 'FieldRow',
  setup(props, context) {
    const templateColumns = ref(props.templateColumns)
    const hasMiddleProp = Object.keys(templateColumns.value).some(value => value === 'middle')
    const {left, right} = templateColumns.value
    const middle = hasMiddleProp ? templateColumns.value['middle'] : null
    const totalColumns = 24
    return {
      totalColumns,
      templateColumns,
      left,
      right,
      middle
    }
  },
  props: {
    templateColumns: {
      type: Object,
      required: true,
      validator: value => Object.keys(value).some(value => ['left', 'middle', 'right'].includes(value))
    }
  },
}
</script>

<style lang="scss">
@import "./src/scss/abstracts";

.field-row {
  display: inline-flex;
  width: 100%;
}


</style>
