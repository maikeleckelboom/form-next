<template>
  <StandaloneForm title="Inloggen"
                  header-text="Inloggen met je account."
                  footer-text="ik ben mijn wachtwoord vergeten ..">
    <Form @submit="onSubmit"
          :validation-schema="validationSchema"
          class="vee-validation-form"
          ref="form">
      <TextField
          v-model="validationSchema.email"
          v-maska="`X*@X*.X*`"
          pattern="/^\S+@\S+\.\S+$/"
          name="email"
          type="email"
          label="E-mailadres"
          placeholder="E-mailadres"
          autocomplete="email"/>
      <TextField
          v-model="validationSchema.password"
          v-maska="{ mask: 'Z*', tokens: { 'Z': { pattern: /[^\s\\]/ }}}"
          name="password"
          type="password"
          label="Wachtwoord"
          placeholder="Wachtwoord"
          autocomplete="on"/>
      <PrimaryButton type="submit" text="Inloggen"/>
    </Form>
  </StandaloneForm>
</template>

<script>
import TextField from "@/components/forms/elements/TextField.vue";
import {Form, useForm} from "vee-validate";
import * as Yup from "yup";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import StandaloneForm from "@/components/templates/StandaloneForm.vue";

export default {
  name: "LoginForm",
  components: {StandaloneForm, PrimaryButton, TextField, Form},

  setup: () => {

    const validationSchema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    })

    const initialValues = {
      email: '',
      password: '',
    }

    const form = useForm({
      validationSchema,
      initialValues
    })

    function onSubmit(values) {
      console.log(values)
    }

    return {
      validationSchema,
      onSubmit,
    };
  },
};
</script>
