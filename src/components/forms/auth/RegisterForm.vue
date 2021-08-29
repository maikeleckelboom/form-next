<template>
  <StandaloneForm title="Registreren"
                  header-text="Een nieuw account aanmaken.">
    <Form @submit="onSubmit"
          :validation-schema="validationSchema"
          class="validation-form"
          ref="form">
      <TextField
          v-model="formValues.full_name"
          :value="formValues.full_name"
          name="full_name"
          type="text"
          v-mask="`X* X* X* X* X*`"
          label="Volledige Naam"
          placeholder="Volledige Naam"
          :success-message="parseName(formValues.full_name).classified"
          autocomplete="name"/>
      <TextField
          v-model="validationSchema.email"
          v-mask="`X*@X*.X*`"
          pattern="/^\S+@\S+\.\S+$/"
          name="email"
          type="email"
          label="E-mailadres"
          success-message="✔ Beschikbaar"
          placeholder="E-mailadres"
          autocomplete="email"/>
      <TextField
          v-model="validationSchema.password"
          v-mask="{ mask: 'Z*', tokens: { 'Z': { pattern: /[^\s\\]/ }}}"
          :password-meter="true"
          name="password"
          type="password"
          alert-message="Gebruik een mix van karakters, vermijd veelvoorkomende woorden en gebruik geen gedenkwaardige toetsenbordpaden."
          label="Wachtwoord"
          placeholder="Wachtwoord"
          autocomplete="off"/>
      <TextField
          v-model="validationSchema.confirm_password"
          :password-meter="true"
          name="confirm_password"
          type="password"
          label="Wachtwoord Herhalen"
          placeholder="Wachtwoord Herhalen"
          autocomplete="off"/>
      <TextField
          v-model="validationSchema.postcode"
          name="postcode"
          type="text"
          label="postcode"
          placeholder="Postcode"
          autocomplete="on"/>
      <TextField
          v-model="validationSchema.address"
          name="address"
          type="text"
          label="Adres"
          placeholder="Adres"
          autocomplete="on"/>
      <TextField
          v-model="validationSchema.city"
          name="city"
          type="text"
          label="Plaats"
          placeholder="Plaats"
          autocomplete="on"/>
      <TextField
          v-model="validationSchema.phone"
          v-mask="`## #### ####`"
          name="phone"
          type="tel"
          label="Telefoon"
          placeholder="Telefoon"
          autocomplete="tel"/>
      <PrimaryButton type="submit" text="Account Aanmaken"/>
    </Form>
  </StandaloneForm>
</template>

<script>
import TextField from "@/components/forms/elements/TextField.vue";
import {Form, useForm} from "vee-validate";
import * as Yup from "yup";
import StandaloneForm from "@/components/templates/StandaloneForm.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import {parseName} from '@/mixins'
import {reactive} from "vue";

export default {
  name: "RegisterForm",
  components: {PrimaryButton, StandaloneForm, TextField, Form},
  setup() {
    const validationSchema = Yup.object().shape({
      full_name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      confirm_password: Yup.string().required().oneOf([Yup.ref("password")]),
      phone: Yup.string().min(17).required(),
      postcode: Yup.string().min(6).required(),
      address: Yup.string().required(),
      city: Yup.string().required(),
      created_on: Yup.date().default(() => new Date()),
    })
    const initialValues = {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
      phone: '',
      postcode: '',
      address: '',
      city: '',
    }


    const formValues = reactive({
      ...initialValues
    })
    const localState = reactive({})

    function keydownListener() {
      window.addEventListener('keydown', (evt) => {
        const {key} = evt
        switch (key) {
          case 'Enter':
            evt.preventDefault()
            break;
        }
      })
    }

    function onKeydown(event) {
      const {key} = event
      switch (key) {
        case 'Backspace':
          break;
        case 'ArrowDown':
          break;
      }
    }
    const form = useForm({validationSchema, initialValues})
    function onSubmit(values) {
      console.log(values)
    }
    return {
      validationSchema,
      formValues,
      parseName,
      onSubmit,
    };
  },
};
</script>
