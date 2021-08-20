<template>
  <StandaloneForm title="Wachtwoord Herstellen"
                  header-text="Een nieuw wachtwoord instellen voor je account.">
    <Form @submit="onSubmit"
          :validation-schema="schema"
          class="vee-validation-form"
          ref="form">
      <TextField
          v-model="schema.email"
          v-maska="`X*@X*.X*`"
          pattern="/^\S+@\S+\.\S+$/"
          name="email"
          type="email"
          label="E-mailadres"
          success-message="✔ Gevalideerd"
          placeholder="E-mailadres"
          autocomplete="email"/>
      <TextField
          v-model="schema.password"
          v-maska="{ mask: 'Z*', tokens: { 'Z': { pattern: /[^\s\\]/ }}}"
          :strength-meter="true"
          name="password"
          type="password"
          context-message=""
          success-message="✔ Okidó!"
          label="Wachtwoord"
          placeholder="Wachtwoord"
          autocomplete="off"/>
      <TextField
          v-model="schema.confirm_password"
          :strength-meter="true"
          name="confirm_password"
          type="password"
          success-message="✔ Yes sir!"
          label="Wachtwoord Herhalen"
          placeholder="Wachtwoord Herhalen"
          autocomplete="off"/>
      <PrimaryButton type="submit" text="Opslaan"/>
    </Form>
  </StandaloneForm>
</template>

<script>
import TextField from "@/components/forms/elements/TextField.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import StandaloneForm from "@/components/templates/StandaloneForm.vue";
import {Form, useForm} from "vee-validate";
import * as Yup from "yup";

export default {
  name: "ResetPasswordForm",
  components: {StandaloneForm, PrimaryButton, TextField, Form},
  setup: () => {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      confirm_password: Yup.string().required().oneOf([Yup.ref("password")]),
    })
    const initialValues = {
      email: '',
      password: '',
      confirm_password: '',
    }
    useForm({validationSchema: schema, initialValues})

    function onSubmit(values) {
      console.log('Submit will be handled here', values)
    }

    return {
      schema,
      onSubmit,
    };
  },
};
</script>
