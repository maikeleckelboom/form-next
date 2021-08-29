<template>
  <StandaloneForm title="Wachtwoord Vergeten"
                  header-text="Het aanvragen van een nieuw wachtwoord."
                  footer-text="Inloggen">
    <Form @submit="onSubmit"
          :validation-validationSchema="validationSchema"
          class="validation-form"
          ref="form">
      <TextField
          v-model="validationSchema.email"
          v-mask="`X*@X*.X*`"
          pattern="/^\S+@\S+\.\S+$/"
          name="email"
          type="email"
          label="E-mailadres"
          placeholder="E-mailadres"
          autocomplete="email"/>
      <PrimaryButton type="submit" text="Email Versturen"/>
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
  name: "ForgotPasswordForm",
  components: {StandaloneForm, PrimaryButton, TextField, Form},

  setup: () => {

    const validationSchema = Yup.object().shape({
      email: Yup.string().email().required(),
    })

    const initialValues = {
      email: '',
    }

    const emailAddresses = ['test@test.com', 'jan@smit.com', 'henk@joop.com']

    const form = useForm({
      validationSchema,
      initialValues
    })

    function onSubmit(values) {
      console.log(values)
    }

    return {
      validationSchema,
      emailAddresses,
      onSubmit,
    };
  },
};
</script>
