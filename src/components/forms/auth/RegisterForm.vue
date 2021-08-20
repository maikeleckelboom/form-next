<template>
  <StandaloneForm title="Registreren"
                  header-text="Een nieuw account aanmaken.">
    <Form @submit="onSubmit"
          :validation-schema="schema"
          class="vee-validation-form"
          ref="form">
      <TextField
          v-model="schema.full_name"
          name="full_name"
          type="text"
          v-maska="{ mask: `X*-X*-X*-X*-X*`, tokens: { '-': { pattern: /[\s]/ }}}"
          label="Volledige Naam"
          placeholder="Volledige Naam"
          :success-message="parseName(schema.full_name).classified"
          autocomplete="name"/>
      <TextField
          v-model="schema.email"
          v-maska="`X*@X*.X*`"
          pattern="/^\S+@\S+\.\S+$/"
          name="email"
          type="email"
          label="E-mailadres"
          success-message="✔ Beschikbaar"
          placeholder="E-mailadres"
          autocomplete="email"/>
      <TextField
          v-model="schema.password"
          v-maska="{ mask: 'Z*', tokens: { 'Z': { pattern: /[^\s\\]/ }}}"
          :password-meter="true"
          name="password"
          type="password"
          example-message="Gebruik een mix van karakters, vermijd veelvoorkomende woorden en gebruik geen gedenkwaardige toetsenbordpaden."
          success-message="✔ Oké"
          label="Wachtwoord"
          placeholder="Wachtwoord"
          autocomplete="off"/>
      <TextField
          v-model="schema.confirm_password"
          :password-meter="true"
          name="confirm_password"
          type="password"
          success-message="✔ Correct"
          label="Wachtwoord Herhalen"
          placeholder="Wachtwoord Herhalen"
          autocomplete="off"/>
      <TextField
          v-model="schema.postcode"
          name="postcode"
          type="text"
          label="postcode"
          success-message="✔ Geldig"
          placeholder="Postcode"
          autocomplete="on"
          :columns="8"/>
      <TextField
          v-model="schema.address"
          name="address"
          type="text"
          label="Adres"
          success-message="✔ Geldig"
          placeholder="Adres"
          autocomplete="on"
          :columns="16"/>
      <TextField
          v-model="schema.city"
          name="city"
          type="text"
          label="Plaats"
          success-message="✔ Geldig"
          placeholder="Plaats"
          autocomplete="on"/>
      <TextField
          v-model="schema.phone"
          v-maska="`## #### ####`"
          name="phone"
          type="tel"
          label="Telefoon"
          success-message="✔ Geldig telefoonnummer."
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
import SubmitButton from "@/components/buttons/SubmitButton.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";

export default {
  name: "RegisterForm",
  components: {PrimaryButton, SubmitButton, StandaloneForm, TextField, Form},

  setup: () => {

    const schema = Yup.object().shape({
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

    const veeForm = useForm({validationSchema: schema, initialValues})

    function onSubmit(values) {
      const {fullName, firstName, infix, lastName, classified} = parseName(values.full_name)

    }

    function stringify(array) {
      return array.reduce((pre, next) => {
        return pre + ' ' + next
      })
    }

    function everythingBetween(array) {
      array.splice(0, 1)
      array.splice(array.length - 1, 1)
      return stringify(array)
    }

    function countWhitespaces(string) {
      return string.split(' ').length - 1
    }

    function parseName(fullName) {
      let firstName = ''
      let infix = ''
      let lastName = ''

      if (fullName && typeof fullName === 'string' && fullName.length) {
        const stringArray = fullName.split(' ')
        const spacesCount = countWhitespaces(fullName)
        firstName = stringArray[0]
        if (spacesCount >= 1) {
          lastName = stringArray[stringArray.length - 1]
        }
        if (spacesCount > 1) {
          infix = everythingBetween(stringArray);
        }
      }

      const classified = infix ? '✔ voornaam | ✔ tussenvoegsel | ✔ achternaam'
          : lastName ? '✔ voornaam | ✔ achternaam' : firstName ? `✔ voornaam` : ''

      return {
        firstName,
        infix,
        lastName,
        fullName,
        classified
      }
    }

    return {
      schema,
      parseName,
      onSubmit,
    };
  },
};
</script>
