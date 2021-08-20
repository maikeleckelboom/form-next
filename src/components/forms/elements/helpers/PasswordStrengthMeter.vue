<template>
  <div class="po-password-strength-meter">
    <PasswordMeter :password="password"/>
  </div>
</template>

<script>
import PasswordMeter from 'vue-simple-password-meter';

export default {
  name: 'PasswordStrengthMeter',
  components: {PasswordMeter},
  props: {
    password: {
      type: String,
      required: true,
    },
  }
}
</script>
