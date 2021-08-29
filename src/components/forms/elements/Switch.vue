<template>
  <label @click="toggle()"
         :for="`${name}-${uid}`"
         :class="{'active': checked}"
         class="switch-container">
    <Field type="checkbox"
           :name="name"
           :id="`${name}-${uid}`"
           :value="checked"
           v-bind="$attrs">
      <span class="switch"/>
      <span class="switch-label-text">
        {{ label }}
      </span>
    </Field>
  </label>
</template>

<script>
import {ref, watchEffect} from 'vue'
import {useField, Field} from "vee-validate";
import {generateUniqueID} from "@/mixins";

export default {
  name: "Switch",
  inheritAttrs: false,
  emits: ['update:modelValue'],
  components: {Field},
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: null,
    },
    name: {
      type: String,
    },
    value: {
      type: [String, Boolean],
    },
    rules: {
      type: String,
      default: undefined,
    }
  },
  setup(props, {emit}) {
    const checked = ref(!!(props.value))
    const uid = generateUniqueID()
    const name = ref(props.name)
    const rules = ref(props.rules)

    const {
      value: inputValue,
      handleChange,
    } = useField(name.value, rules.value, {
      initialValue: props.value,
    })

    const toggle = () => {
      checked.value = !checked.value
      handleChange(checked.value)
    }

    watchEffect(() => {
      emit('update:modelValue', inputValue)
    })

    return {
      checked,
      uid,
      handleChange,
      toggle,
    }
  },

};
</script>

<style scoped lang="scss">
@import "./src/scss/abstracts";

.switch-container {
  cursor: pointer;
  position: relative;
  justify-content: space-around;
  min-height: rem-calc(50);
  flex-direction: row-reverse;
  margin: 0 rem-calc(6);
  width: calc(100% - #{rem-calc(12)});
  border: rem-calc(14) transparent;
  border-bottom-style: solid;
  border-top-style: solid;
  overflow: hidden;
  display: grid;
  grid-template-columns: rem-calc(70) 1fr;
  grid-gap: rem-calc(28);
  text-align: center;
  padding: 0 rem-calc(32) 0 rem-calc(10);
  @include dashed-background-outline;

  @include set-breakpoint(smartphone, down) {
    grid-gap: rem-calc(16);
    grid-template-columns: rem-calc(38) 1fr;
  }

  &::before {
    content: "";
    inset: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    visibility: visible;
    z-index: 1;
  }

  &::after {
    z-index: 2;
  }

  span {
    position: relative;
    user-select: none;
    z-index: 3;
    font-weight: 500;
    font-size: rem-calc(16);
    font-style: normal;
    line-height: 3;
    top: em-calc(1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}


.switch-container.active .switch::before {
  $distance: calc(var(--switch-container-width) - var(--switch-size));
  transform: translateX($distance);
}

span.switch {
  top: 50%;
  transform: translate(0, -50%);
}

.switch {
  --switch-container-width: 2.4em;
  --switch-size: calc(var(--switch-container-width) / 2);
  --switch-size-transition: 180ms ease-in-out transform;

  --light-gray: #e2e8f0;
  --gray: #cbd5e0;

  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  flex-basis: var(--switch-container-width);
  width: var(--switch-container-width);

  border-radius: var(--switch-size);
  background-color: var(--light-gray);
  transition: background-color 0.25s ease-in-out;
  z-index: 3;


  &::before {
    content: "";
    position: absolute;
    left: em-calc(1);
    height: calc(var(--switch-size) - 0.25rem);
    width: calc(var(--switch-size) - 0.25rem);
    border-radius: 50%;
    background-color: $white;
    transition: var(--switch-size-transition);
  }

  .active & {
    background: $app-green;

    &::before {
      border: none;
    }
  }
}
</style>
