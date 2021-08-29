<template>
  <StandaloneForm title="Nieuw Account Aanmaken"
                  header-text="Voeg een nieuwe gebruiker toe aan het Yoot-netwerk.">
    <Form @submit="onSubmit"
          :validation-schema="validationSchema"
          v-slot="{values, handleChange, submitCount, isSubmitting }"
          class="validation-form"
          ref="form">
      <section class="personalia-section">
        <div class="section-heading">
          <h1 class="section-title">Contactgegevens</h1>
        </div>
        <TextField v-model="formValues.full_name"
                   :value="formValues.full_name"
                   @keydown="onKeydown($event)"
                   name="full_name"
                   type="text"
                   v-mask="'X* X* X* X* X*'"
                   label="Volledige Naam"
                   placeholder="Volledige Naam"
                   :success-message="parseName(formValues.full_name).classified"
                   autocomplete="name"
                   v-focus/>
        <TextField v-model="formValues.email"
                   :value="formValues.email"
                   @keydown="onKeydown($event)"
                   v-mask="'X*@X*.X*'"
                   name="email"
                   type="email"
                   label="E-mailadres"
                   placeholder="E-mailadres"
                   autocomplete="email"/>
        <TextField v-model="formValues.phone"
                   :value="formValues.phone"
                   @keydown="onKeydown($event)"
                   name="phone"
                   type="tel"
                   label="Telefoon"
                   placeholder="Telefoon"
                   autocomplete="tel"/>
      </section>
      <section class="address-data-section">
        <div class="section-heading">
          <h1 class="section-title">Adresgegevens</h1>
        </div>
        <FieldRow :template-columns="{left: 12, right: 12}">
          <template v-slot:left>
            <TextField v-model="formValues.postcode"
                       :value="formValues.postcode"
                       @keydown="onKeydown($event)"
                       name="postcode"
                       v-mask="'#### AA*'"
                       type="text"
                       label="postcode"
                       placeholder="Postcode"
                       autocomplete="zip"/>
          </template>
          <template v-slot:right>
            <TextField v-model="formValues.building_number"
                       :value="formValues.building_number"
                       @keydown="onKeydown($event)"
                       v-mask="'X* X*'"
                       name="building_number"
                       type="text"
                       label="Huisnummer en toevoeging"
                       placeholder="Huisnummer en toevoeging"
                       autocomplete="on"/>
          </template>
        </FieldRow>
        <!---->
        <Switch v-model="ADDRESS_LOOKUP_ENABLED"
                :value="ADDRESS_LOOKUP_ENABLED"
                :name="`ADDRESS_LOOKUP_ENABLED`"
                :label="ADDRESS_LOOKUP_ENABLED
                  ? 'Uw adres wordt automatisch aangevuld'
                  : 'Uw adres handmatig in vullen'"/>
        <!---->
        <TextField v-model="formValues.street_name"
                   :value="formValues.street_name"
                   @keydown="onKeydown($event)"
                   :class="ADDRESS_LOOKUP_ENABLED ? 'disabled' : 'enabled'"
                   :disabled="ADDRESS_LOOKUP_ENABLED"
                   tooltip-helper-text="Dit veld kan automatisch worden ingevuld"
                   name="street_name"
                   type="text"
                   label="Straat"
                   placeholder="Straat"
                   autocomplete="on"/>
        <TextField v-model="formValues.city"
                   :value="formValues.city"
                   @keydown="onKeydown($event)"
                   v-mask="`X* X* X* X* X* X*`"
                   :class="ADDRESS_LOOKUP_ENABLED ? 'disabled' : 'enabled'"
                   :disabled="ADDRESS_LOOKUP_ENABLED"
                   tooltip-helper-text="Dit veld kan automatisch worden ingevuld"
                   name="city"
                   type="text"
                   label="Plaats"
                   placeholder="Plaats"
                   autocomplete="on"/>
      </section>
      <section class="company-section">
        <div class="section-heading">
          <h1 class="section-title">Accounttype</h1>
        </div>
        <FieldsetToggle value-active="Bedrijf"
                        value-inactive="Particulier"
                        value="Particulier"
                        tabindex="0">
          <TextField v-model="formValues.company"
                     :value="formValues.company"
                     @keydown="onKeydown($event)"
                     name="company"
                     type="text"
                     label="Naam"
                     placeholder="Naam"
                     autocomplete="on"/>
          <TextField v-model="formValues.website"
                     :value="formValues.website"
                     @keydown="onKeydown($event)"
                     tooltip-helper-text="Dit veld is optioneel"
                     name="website"
                     type="url"
                     label="Website"
                     placeholder="Website"
                     autocomplete="on"/>
          <TextField v-model="formValues.kvk_number"
                     :value="formValues.kvk_number"
                     @keydown="onKeydown($event)"
                     tooltip-helper-text="Dit veld is optioneel"
                     name="kvk_number"
                     type="text"
                     label="KVK-nummer"
                     placeholder="KVK-nummer"
                     autocomplete="on"/>
          <TextField v-model="formValues.brl_certification_number"
                     :value="formValues.brl_certification_number"
                     @keydown="onKeydown($event)"
                     tooltip-helper-text="Dit veld is optioneel"
                     name="brl_certification_number"
                     type="text"
                     label="BRL-certificatienummer"
                     placeholder="BRL-certificatienummer"
                     autocomplete="on"/>
        </FieldsetToggle>
      </section>
      <section class="button-section">
        <PrimaryButton type="submit"
                       text="Account Aanmaken"
                       @keydown="onKeydown($event)"
                       :loading="!!(state.loading || isSubmitting)"
                       :disabled="!!(state.loading || isSubmitting)"/>
      </section>
    </Form>
  </StandaloneForm>
</template>


<script>
import {focusTouchingInputField, parseName, isUpperCase, removeProperties, fakeApiRequest, infoBalloon,} from '@/mixins'
import {ref, unref, reactive, computed} from "vue";
import {Form, useForm} from "vee-validate";
import * as Yup from "yup";
import TextField from "@/components/forms/elements/TextField.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import StandaloneForm from "@/components/templates/StandaloneForm.vue";
import FieldsetToggle from "@/components/forms/FieldsetToggle.vue";
import FieldRow from "@/components/templates/FieldRow.vue";
import Tooltip from "@/components/misc/Tooltip.vue";
import Switch from "@/components/forms/elements/Switch.vue";

export default {
  name: "CreateUserForm",
  components: {
    Switch,
    Tooltip,
    FieldsetToggle,
    FieldRow,
    StandaloneForm,
    PrimaryButton,
    TextField,
    Form
  },
  setup() {
    const validationSchema = computed(() => Yup.object().shape({
      full_name: Yup.string().min(2).required().label('Naam'),
      email: Yup.string().email().required().label('E-mailadres'),
      phone: Yup.string().min(6).required().label('Telefoon'),
      postcode: Yup.string().min(6).required().label('Postcode'),
      building_number: Yup.string().min(1).required().label('Huisnummer en toevoeging'),
      street_name: Yup.string().label('Straat')
          .when("ADDRESS_LOOKUP_ENABLED", {
            is: false,
            then: Yup.string().min(2).required()
          }),
      city: Yup.string().label('Plaats')
          .when("ADDRESS_LOOKUP_ENABLED", {
            is: false,
            then: Yup.string().min(2).required()
          }),
      company: Yup.string().label('Naam')
          .when("ACCOUNT_TYPE_IS_COMPANY", {
            is: false,
            then: Yup.string().min(2).required()
          }),
      kvk_number: Yup.string().optional().label('KVK-nummer'),
      website: Yup.string().optional().label('Website'),
      brl_certification_number: Yup.string().optional().label('BRL-certificatienummer'),
      created_on: Yup.date().default(() => new Date()),
      ACCOUNT_TYPE_IS_COMPANY: Yup.boolean().label('Accounttype'),
      ADDRESS_LOOKUP_ENABLED: Yup.boolean().label('Adres'),
    }))

    const validationConditionals = {
      ADDRESS_LOOKUP_ENABLED: true,
      ACCOUNT_TYPE_IS_COMPANY: false,
    }

    const initialValues = {
      full_name: '',
      email: '',
      phone: '',
      postcode: '',
      building_number: '',
      street_name: '',
      city: '',
      website: '',
      company: '',
      kvk_number: '',
      brl_certification_number: '',
      ...validationConditionals,
    }

    const form = useForm({
      validationSchema,
      initialValues
    })

    const formValues = reactive({
      ...initialValues
    })

    const ADDRESS_LOOKUP_ENABLED = unref(initialValues.ADDRESS_LOOKUP_ENABLED)
    const ACCOUNT_TYPE_IS_COMPANY = unref(initialValues.ACCOUNT_TYPE_IS_COMPANY)

    const state = reactive({
      loading: false,
    })

    const onSubmit = (async (values) => {
      setloading(true)
      const uppercaseKeys = Object.keys(values).filter(key => isUpperCase(key))
      const cleaned = removeProperties(values, ...uppercaseKeys)
      await fakeApiRequest()
      setloading(false)
    })

    const setloading = (bool) => state.loading = bool

    const onKeydown = (event) => {
      const {key} = event
      switch (key) {
        case 'ArrowUp':
          focusTouchingInputField(event, 'prev')
          break;
        case 'ArrowDown':
          focusTouchingInputField(event, 'next')
          break;
      }
    }

    return {
      ADDRESS_LOOKUP_ENABLED,
      ACCOUNT_TYPE_IS_COMPANY,
      validationSchema,
      initialValues,
      formValues,
      onSubmit,
      state,
      infoBalloon,
      onKeydown,
      parseName,
    };
  },
};
</script>
