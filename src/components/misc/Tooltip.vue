<template>
  <span :tooltip="text" :position="position"><slot/></span>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    tooltipText: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    position: {
      default: "top",
      type: String,
    },
  },
};
</script>


<style scoped>
* {
  display: flex;
}
</style>
