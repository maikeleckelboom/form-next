<template>
  <StandaloneForm title="Accountgegevens Aanpassen"
                  header-text="Update resource voor interne app gebruikers.">
    <Form @submit="onSubmit"
          :validation-validationSchema="validationSchema"
          :initial-values="validationSchema.values"
          class="validation-form"
          ref="form">
      <TextField v-model="formValues.full_name"
                 :value="formValues.full_name"
                 name="full_name"
                 type="text"
                 v-mask="`X* X* X* X* X*`"
                 label="Volledige Naam"
                 placeholder="Volledige Naam"
                 :success-message="parseName(formValues.full_name).classified"
                 autocomplete="name"/>
      <TextField v-model="formValues.address"
                 :value="formValues.address"
                 name="address"
                 type="text"
                 label="Adres"
                 placeholder="Adres"
                 autocomplete="on"
                 :columns="16"/>
      <TextField v-model="formValues.postcode"
                 :value="formValues.postcode"
                 name="postcode"
                 type="text"
                 label="postcode"
                 placeholder="Postcode"
                 autocomplete="on"
                 :columns="8"/>
      <TextField v-model="formValues.city"
                 :value="formValues.city"
                 name="city"
                 type="text"
                 label="Plaats"
                 placeholder="Plaats"
                 autocomplete="on"/>
      <TextField v-model="formValues.phone"
                 :value="formValues.phone"
                 v-mask="`+31 ######*`"
                 name="phone"
                 type="tel"
                 label="Telefoon"
                 placeholder="Telefoon"
                 autocomplete="tel"/>
      <TextField v-model="formValues.company"
                 :value="formValues.company"
                 name="company"
                 type="text"
                 label="Bedrijf"
                 placeholder="Bedrijf"
                 autocomplete="on"/>
      <TextField v-model="formValues.kvk_number"
                 :value="formValues.kvk_number"
                 name="kvk_number"
                 type="text"
                 label="KVK-nummer"
                 placeholder="KVK-nummer"
                 autocomplete="on"/>
      <TextField v-model="formValues.brl_certification_number"
                 :value="formValues.brl_certification_number"
                 name="brl_certification_number"
                 type="text"
                 label="BRL-certificatienummer"
                 placeholder="BRL-certificatienummer"
                 autocomplete="on"/>
      <PrimaryButton type="submit" text="Accountgegevens Aanpassen"/>
    </Form>
  </StandaloneForm>
</template>

<script>
import TextField from "@/components/forms/elements/TextField.vue";
import {Form, useForm} from "vee-validate";
import * as Yup from "yup";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import StandaloneForm from "@/components/templates/StandaloneForm.vue";
import '@/prototypes'
import {parseName, stringify} from '@/mixins'
import {reactive} from "vue";


export default {
  name: "UpdateUserForm",
  components: {StandaloneForm, PrimaryButton, TextField, Form},

  setup: () => {

    const validationSchema = Yup.object().shape({
      full_name: Yup.string().required(),
      phone: Yup.string().required(),
      address: Yup.string().required(),
      postcode: Yup.string().required(),
      city: Yup.string().required(),
      company: Yup.string().required(),
      kvk_number: Yup.number().required(),
      brl_certification_number: Yup.string().required(),
      created_on: Yup.date().default(() => new Date()),
    })


    const initialValues = {
      full_name: 'Maikel Eckelboom',
      phone: '0625107682',
      postcode: '8191 LC',
      address: 'Hullenzijweg 4',
      city: 'Wapenveld',
      company: 'Bedrijf',
      kvk_number: '102933448527',
      brl_certification_number: 'AA28ID72AE22',
    }

    const form = useForm({validationSchema: validationSchema, initialValues})

    const formValues = reactive({
      ...initialValues
    })

    function onSubmit(values) {
      const {fullName, firstName, middleNames, lastName, classified} = parseName(values.full_name)

      console.log(values, classified)
    }


    return {
      validationSchema,
      parseName,
      onSubmit,
      formValues
    };
  },
};
</script>
