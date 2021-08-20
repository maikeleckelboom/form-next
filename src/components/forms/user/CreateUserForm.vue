<template>
  <StandaloneForm title="Nieuw Account Aanmaken"
                  header-text="Hier kunt u voor iemand anders een account aan maken">
    <p>De gebruiker krijgt automatisch een e-mail met zijn/haar inloggegevens.</p>
    <pre>{{ localState.suggestions }}</pre>
    <Form @submit="onSubmit"
          :validation-schema="schema"
          class="vee-validation-form"
          ref="form">
      <TextField v-model="formValues.full_name"
                 :value="formValues.full_name"
                 name="full_name"
                 type="text"
                 v-maska="`X* X* X* X* X*`"
                 label="Volledige Naam"
                 placeholder="Volledige Naam"
                 :success-message="parseName(formValues.full_name).classified"
                 autocomplete="name"/>
      <TextField v-model="formValues.address"
                 :value="formValues.address"
                 v-on:keydown="deduce('address', $event.target.value)"
                 v-on:keydown.delete="handleKeydownEvent($event)"
                 :suggestion="localState.suggestions.address"
                 name="address"
                 type="text"
                 label="Adres"
                 placeholder="Adres"
                 autocomplete="on"
                 :columns="16"/>
      <TextField v-model="formValues.postcode"
                 :value="formValues.postcode"
                 v-on:keydown="deduce('postcode', $event.target.value)"
                 v-on:keydown.delete="handleKeydownEvent($event)"
                 :suggestion="localState.suggestions.postcode"
                 name="postcode"
                 v-maska="`#### AA`"
                 type="text"
                 label="postcode"
                 placeholder="Postcode"
                 autocomplete="on"
                 :columns="8"/>
      <TextField v-model="formValues.city"
                 :value="formValues.city"
                 v-on:keydown="deduce('city', $event.target.value)"
                 v-on:keydown.delete="handleKeydownEvent($event)"
                 :suggestion="localState.suggestions.city"
                 name="city"
                 type="text"
                 v-maska="`#### AA`"
                 label="Plaats"
                 placeholder="Plaats"
                 autocomplete="on"/>
      <TextField v-model="formValues.phone"
                 :value="formValues.phone"
                 v-maska="`+31 ######*`"
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
                 autocomplete="on"
                 columns="10"/>
      <TextField v-model="formValues.kvk_number"
                 :value="formValues.kvk_number"
                 name="kvk_number"
                 type="text"
                 label="KVK-nummer"
                 placeholder="KVK-nummer"
                 autocomplete="on"
                 columns="14"/>
      <TextField v-model="formValues.brl_certification_number"
                 :value="formValues.brl_certification_number"
                 name="brl_certification_number"
                 type="text"
                 label="BRL-certificatienummer"
                 placeholder="BRL-certificatienummer"
                 autocomplete="on"/>
      <PrimaryButton type="submit" text="Account Aanmaken"/>
    </Form>
  </StandaloneForm>
</template>


<script>
import TextField from "@/components/forms/elements/TextField.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import StandaloneForm from "@/components/templates/StandaloneForm.vue";
import {Form, useForm, useFormValues} from "vee-validate";
import * as Yup from "yup";
import {computed, onMounted, reactive, ref} from "vue";
// Mapboxgl with MapboxGeocoder
// See: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// onMounted(() => {
//   new MapboxGeocoder({
//     accessToken: mapbox.accessToken,
//     mapboxgl: mapboxgl,
//     types: 'region, place, postcode', // 'country, region, place, postcode, locality, neighborhood',
//     countries: 'nl',
//     bbox: [3.032227, -50.680797, 7.602539, -53.644638], // The Netherlands
//   });
// })

export default {
  name: "CreateUserForm",
  components: {StandaloneForm, PrimaryButton, TextField, Form},

  setup: () => {

    const schema = Yup.object().shape({
      full_name: Yup.string().required(),
      phone: Yup.string().required(),
      postcode: Yup.string().required(),
      address: Yup.string().required(),
      city: Yup.string().required(),
      company: Yup.string().required(),
      kvk_number: Yup.number().required(),
      brl_certification_number: Yup.string().required(),
      created_on: Yup.date().default(() => new Date()),
    })

    const initialValues = {
      full_name: '',
      phone: '',
      postcode: '',
      address: '',
      city: '',
      company: '',
      kvk_number: '',
      brl_certification_number: '',
    }

    const form = useForm({validationSchema: schema, initialValues})

    const formValues = reactive({
      ...initialValues
    })

    const localState = reactive({
      suggestions: {
        postcode: '',
        address: '',
        city: '',
      },
    })

    function clearPlaceholder() {
      localState.suggestions = {
        address: '',
        postcode: '',
        city: '',
      }
    }

    function handleKeydownEvent(event) {
      const {key} = event
      console.log('v-on:keydown', key, event)
      switch (key) {
        case 'Backspace':
          clearPlaceholder()
          break;
      }
    }

    const mapbox = {
      accessToken: 'pk.eyJ1IjoibWFpa2VsZTAxIiwiYSI6ImNrZ2d2NnFycjA1MjUydHBnNGUyN2dra3MifQ.oSjzPcw2LATvsokT1UIi2A',
      country: 'nl',
    }

    async function deduce(type, searchQuery) {
      const values = await searchRelatedLocationValues(type, searchQuery)
      const allowed = Object.keys(values).filter(key => values[key] !== undefined)

      const filteredValues = Object.keys(values)
          .filter(key => allowed.includes(key))
          .reduce((obj, key) => {
            obj[key] = values[key]
            return obj
          }, {})

      console.log(filteredValues)


      window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') {
          console.log('KLABANGS!')

          Object.entries(filteredValues).forEach(([key, value]) => {
            // if (key === type) return
            console.log(key, value)
            Object.assign(formValues, {[key]: value})
          })
        }
      })




    }

    function searchRelatedLocationValues(type, searchQuery) {
      return new Promise((resolve, reject) => {
        if (searchQuery.length >= 2) {
          console.log(encodeURI(searchQuery))
          return fetch(`https://api.mapbox.com/v4/geocode/mapbox.places/${encodeURI(searchQuery)}.json?country=${mapbox.country}&access_token=${mapbox.accessToken}`)
              .then((response => response.json()))
              .then((data) => {
                let address
                let postcode
                let city
                if (data && data.features && data.features.length) {
                  const location = data.features.first()['place_name'].split(',')
                  const placeType = data.features.first()['place_type']
                  const addressfield = placeType.includes('address')
                  const postcodeField = placeType.includes('postcode')
                  if (addressfield) {
                    const postcodeCity = location[1].split(' ')
                    postcode = `${postcodeCity[1]} ${postcodeCity[2]}`
                    city = postcodeCity[3]
                    Object.assign(localState.suggestions, {address: location[0], postcode, city})
                  } else if (postcodeField) {
                    city = location[1]
                    Object.assign(localState.suggestions, {postcode: location[0], city})
                  } else {
                    Object.assign(localState.suggestions, {city: location[0]})
                  }
                }
                resolve({
                  postcode,
                  address,
                  city,
                })
              })
              .catch(error => reject(error.response || error))
        }
      })
    }

    function onSubmit(values) {
      const {firstName, middleNames, lastName, classified} = parseName(values.full_name)
      console.log('submit', values)
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

    function countWords(str) {
      return str.split(' ').filter((n) => n !== '').length;
    }

    function parseName(fullName) {
      let firstName = ''
      let middleNames = ''
      let lastName = ''
      let classified = ''
      if (fullName && typeof fullName === 'string' && fullName.length) {
        const wordsArray = fullName.split(' ')
        const wordsNum = countWords(fullName)
        if (wordsNum >= 1) {
          firstName = wordsArray.first()
        }
        if (wordsNum >= 2) {
          lastName = wordsArray[wordsArray.length - 1]
        }
        if (wordsNum >= 3) {
          middleNames = everythingBetween(wordsArray);
        }
        classified = wordsNum >= 4 ? '✔ voornaam | ✔ tussenvoegsels | ✔ achternaam'
            : wordsNum === 3 ? '✔ voornaam | ✔ tussenvoegsel | ✔ achternaam'
                : wordsNum === 2 ? '✔ voornaam | ✔ achternaam'
                    : wordsNum === 1 ? '✔ voornaam' : ''
      }
      return {
        firstName,
        middleNames,
        lastName,
        fullName,
        classified
      }
    }

    return {
      schema,
      parseName,
      onSubmit,
      deduce,
      initialValues,
      formValues,
      localState: localState,
      handleKeydownEvent
    };
  },
};
</script>
