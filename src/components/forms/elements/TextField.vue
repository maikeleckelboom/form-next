<template>
  <fieldset class="field-wrapper" :class="`columns-${columns}-${24}`">
    <ContextMessage :message="contextMessage" :meta="meta"/>
    <AlertMessage :message="alertMessage" :meta="meta"/>
    <div class="control" :class="classList()">
      <div class="vee-field-control">
        <Field @input="onInput"
               @focus="onFocus"
               @blur="onFocus"
               v-on:keydown.enter.prevent="onKeydown($event)"
               :name="name"
               :type="data.type"
               :id="name"
               v-bind="$attrs"
               :placeholder="smartPlaceholder"
               class="input"
               ref="input"
               tabindex="1"/>
        <input v-if="showSuggestion"
               :placeholder="suggestion"
               type="text"
               disabled="disabled"
               class="autocomplete-placeholder"
               tabindex="-1"/>
      </div>
      <FieldLabel :label="label" :for="name" :id="`label-${name}`" ref="label"/>
      <InputVisual :class-list="classList()"/>
      <PasswordStrengthMeter v-if="passwordMeter" :password="inputValue"/>
      <ErrorMessageTooltip v-if="errorsTooltip" :focused="data.focused" :message="errorMessage"/>
      <ErrorMessage v-else-if="errorMessage" :name="name" class="field-error-message"/>
      <SuccessMessage :message="successMessage" :meta="meta"/>
      <TogglePassword v-on:togglePassword="togglePassword($event)" :password-fields="passwordFields" :name="name"/>
    </div>
  </fieldset>
</template>

<script>
import {computed, reactive, ref} from "vue";
import {useField, useFormValues, Field, ErrorMessage} from "vee-validate";
import FieldLabel from "@/components/forms/elements/FieldLabel.vue";
import InputVisual from "@/components/forms/elements/helpers/InputVisual.vue";
import ErrorMessageTooltip from "@/components/forms/elements/messages/ErrorMessageTooltip.vue";
import SuccessMessage from "@/components/forms/elements/messages/SuccessMessage.vue";
import TogglePassword from "@/components/forms/elements/helpers/TogglePassword.vue";
import AlertMessage from "@/components/forms/elements/messages/AlertMessage.vue";
import ContextMessage from "@/components/forms/elements/messages/ContextMessage.vue";
import PasswordStrengthMeter from "@/components/forms/elements/helpers/PasswordStrengthMeter.vue";


export default {
  name: 'TextInput',
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(props, context) {
    const {
      value: inputValue,
      errorMessage,
      handleChange,
      handleBlur,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });

    const inputType = ref(props.type)
    const passwordFields = ['password', 'confirm_password']
    const suggestion = ref(props.suggestion)
    const showSuggestion = () => !!(suggestion && suggestion.value.length >= 2)
    const placeholder = ref(props.placeholder)


    function onInput(event) {
      context.emit('update:modelValue', event.target.value)
      handleChange(event)
    }

    const field = reactive({
      type: inputType,
      focused: false,
    })

    function onFocus() {
      field.focused = !field.focused
      if (!field.focused) {
        handleBlur()
      }
    }

    const smartPlaceholder = computed(() => {
      if (field.focused || showSuggestion()) {
        return ''
      } else {
        return placeholder.value
      }
    })


    function onKeydown(event) {
      const {key} = event
      switch (key) {
        case 'Enter':
          break;
      }
    }

    function togglePassword(event) {
      field.type = event.value ? 'password' : 'text'
    }

    function classList() {
      const {errorMessage, inputValue} = this
      const {initialValue, ...classes} = meta;
      return {
        invalid: !!errorMessage,
        focused: !!(field.focused || inputValue.length),
        ...classes,
      }
    }

    return {
      onFocus,
      classList,
      togglePassword,
      onInput,
      handleChange,
      errorMessage,
      passwordFields,
      inputValue,
      data: field,
      meta,
      inputType,
      showSuggestion,
      onKeydown,
      placeholder,
      smartPlaceholder,
    };
  },
  components: {
    Field,
    ErrorMessage,
    PasswordStrengthMeter,
    ContextMessage,
    AlertMessage,
    TogglePassword,
    SuccessMessage,
    InputVisual,
    FieldLabel,
    ErrorMessageTooltip,

  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    contextMessage: {
      type: String,
      default: '',
    },
    alertMessage: {
      type: String,
      default: '',
    },
    successMessage: {
      type: String,
      default: '',
    },
    passwordMeter: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: [Number, String],
      default: 24,
    },
    errorsTooltip: {
      type: Boolean,
      default: true,
    },
    suggestion: {
      type: String,
      default: '',
    }
  },
};
</script>
