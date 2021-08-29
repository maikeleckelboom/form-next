<template>
  <a @click="handleClick()" class="btn-link addition-text text-right">
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
  },
  setup(props, {emit}) {
    const showPassword = ref(false)

    function handleClick() {
      emit('togglePassword', {value: showPassword, name: props.name})
      showPassword.value = !showPassword.value
    }

    return {
      handleClick,
      showPassword
    }
  }
}
</script>
