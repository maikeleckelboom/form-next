<template>
  <a v-if="passwordFields.includes(name)"
     @click="handleClick()" class="btn-link addition-text text-right">
    {{ showPassword ? 'Wachtwoord Verbergen' : 'Wachtwoord Weergeven' }}
  </a>
</template>

<script>
import {ref} from "vue";

export default {
  name: 'togglePassword',
  emits: ['togglePassword'],
  props: {
    name: {
      required: true,
      type: String,
    },
    passwordFields: {
      required: true,
      type: Array,
    }
  },
  setup(props, context) {
    let showPassword = ref(false)

    function handleClick() {
      context.emit('togglePassword', {value: this.showPassword, name: props.name})
      this.showPassword = !this.showPassword
    }

    return {
      handleClick,
      showPassword
    }
  }
}
</script>
