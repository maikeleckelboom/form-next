<template>
  <button class="btn btn-primary"
          :type="type"
          :id="`btn-${uid}`"
          v-bind="$attrs"
          tabindex="0"
          :class="{'focused': focused}"
          @focus="setFocus(true)"
          @blur="setFocus(false)">
    <span v-if="!loading">{{ text }}</span>
    <span v-else>Loadingz</span>
  </button>
</template>

<script>
import {getCurrentInstance, onMounted, ref} from "vue";
import {generateUniqueID} from "@/mixins";

export default {
  name: 'PrimaryButton',
  inheritAttrs: true,
  props: {
    text: {
      type: String,
      requird: true,
    },
    type: {
      type: String,
      default: 'submit',
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  setup() {
    const uid = generateUniqueID()

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
    //transition: ease-in-out width, height 140ms;
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
    transition-duration: 240ms;
    filter: hue-rotate(20deg);
  }

  &:focus {

  }

  &:focus-visible {

  }
}


</style>
