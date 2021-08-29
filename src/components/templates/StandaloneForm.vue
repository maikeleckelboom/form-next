<template>
  <div class="standalone-form-component">
    <div class="standalone-form-wrapper">
      <div v-if="useLogo" class="standalone-form-logo centered">
        <img :src="logoPath" class="app-logo" alt="Yoot"/>
        <img :src="sloganPath" class="app-logo-slogan-only" alt="Exited for the future"/>
      </div>
      <div class="standalone-form-heading">
        <div class="standalone-form-title-text">
          <h1>{{ title }}</h1>
          <p>{{ headerText }}</p>
        </div>
        <div class="standalone-form-option-icons">
        </div>
      </div>
      <div class="standalone-form">
        <slot/>
      </div>
    </div>
    <div class="standalone-form-footer">
      <a class="btn-link">{{ footerText }}</a>
    </div>
  </div>
</template>

<script>
import Tooltip from "@/components/misc/Tooltip.vue";
import {question} from '@/mixins'

export default {
  name: 'StandaloneForm',
  components: {Tooltip},
  props: {
    title: {
      type: String,
      default: '',
    },
    headerText: {
      type: String,
      default: '',
    },
    footerText: {
      type: String,
      default: '',
    },
    useLogo: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const logoPath = new URL('/assets/logo/YOOT_LOGO.png', import.meta.url)
    const sloganPath = new URL('/assets/logo/YOOT_SLOGAN_ONLY.png', import.meta.url)
    return {
      logoPath,
      sloganPath,
      question
    }
  }
}
</script>
