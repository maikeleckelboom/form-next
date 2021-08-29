<template>
  <PasswordStrengthMeter :password="value"/>
  <TogglePassword @togglePassword="togglePassword($event)" :name="name"/>
</template>


<script>
import PasswordStrengthMeter from "@/components/forms/elements/helpers/PasswordStrengthMeter.vue";
import TogglePassword from "@/components/forms/elements/helpers/TogglePassword.vue";

export default {
  components: {TogglePassword, PasswordStrengthMeter},
  emits: ['togglePassword'],
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, {emit}) {
    const togglePassword = (event) => {
      emit('togglePassword', event.value)
    }

    return {
      togglePassword,
    }
  }
}
</script>
