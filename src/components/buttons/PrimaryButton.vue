<template>
  <button class="btn btn-primary"
          :type="type"
          :id="`btn-${uid}`"
          v-bind="$attrs"
          tabindex="0"
          :class="{'focused': focused}"
          @focus="setFocus(true)"
          @blur="setFocus(false)">
    {{ text }}
  </button>
</template>

<script>
import {getCurrentInstance, onMounted, ref} from "vue";

export default {
  name: 'PrimaryButton',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      requird: true,
    },
    type: {
      type: String,
      default: 'submit',
    },
  },
  setup() {
    const uidGenerator = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    const uid = uidGenerator()

    function buttonHoverEffect(element) {
      element.onmousemove = (e) => {
        const x = e.pageX - e.target.offsetLeft
        const y = e.pageY - e.target.offsetTop
        e.target.style.setProperty('--size', `0.2em`)
        e.target.style.setProperty('--btn-pos-x', `${x}px`)
        e.target.style.setProperty('--btn-pos-y', `${y}px`)
      }
    }

    onMounted(() => {
      const element = document.querySelector(`#btn-${uid}`)
      buttonHoverEffect(element)
    })

    let focused = ref(false)

    function setFocus(boolean) {
      focused = boolean
    }

    return {
      uid,
      focused,
      setFocus
    }
  }
}
</script>

<style lang="scss">
.btn-primary {
  &::before {
    --size: 0;
    content: '';
    position: absolute;
    left: var(--btn-pos-x);
    top: var(--btn-pos-y);
    width: calc(var(--size) / 4);
    height: var(--size);
    background: radial-gradient(circle, #e3e1e7, #e3e1e7, transparent);
    transform: translate(-50%, -50%);
    transition: width 120ms ease-out, height 120ms ease;
    border-radius: 20%;
    mix-blend-mode: color-burn; // multiply ~ soft-light ~ color-burn
  }

  &:hover::before {
    --size: 200%;
  }

  &:active::before {
    width: calc(var(--size) / 2);
  }


  &:focus,
  &:focus-visible {
    filter: hue-rotate(43deg);
  }

  &:focus {

  }

  &:focus-visible {

  }
}


</style>
