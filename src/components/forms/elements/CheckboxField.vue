<template>
  <fieldset class="field-wrapper">
    <ContextMessage :message="contextMessage" :meta="meta"/>
    <AlertMessage :message="alertMessage" :meta="meta"/>
    <div class="control" :class="classList()">
      <CustomCheckbox :value="value" :name="name" v-bind="$attrs"/>
      <FieldLabel :label="label" :for="name" :id="`label-${name}`" ref="label"/>
      <SuccessMessage :message="successMessage" :meta="meta"/>
      <ErrorMessageTooltip v-if="errorsTooltip" :focused="field.focused" :message="errorMessage"/>
      <ErrorMessage v-else :name="name" class="field-error-message"/>
    </div>
  </fieldset>
</template>

<script>
import {computed, reactive} from "vue";
import {useField, ErrorMessage} from "vee-validate";
import PasswordMeter from 'vue-simple-password-meter';
import FieldLabel from "@/components/forms/elements/FieldLabel.vue";
import InputVisual from "@/components/forms/elements/helpers/InputVisual.vue";
import SuccessMessage from "@/components/forms/elements/messages/SuccessMessage.vue";
import TogglePassword from "@/components/forms/elements/helpers/TogglePassword.vue";
import AlertMessage from "@/components/forms/elements/messages/AlertMessage.vue";
import ContextMessage from "@/components/forms/elements/messages/ContextMessage.vue";
import CustomCheckbox from "@/components/forms/elements/CustomCheckbox.vue";
import ErrorMessageTooltip from "@/components/forms/elements/messages/ErrorMessageTooltip.vue";

export default {
  name: 'CheckboxInput',
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(props, context) {

    const localValue = computed({
      get: () => inputValue.value,
      set: (value) => context.emit("update:modelValue", value),
    })

    const {
      value: inputValue,
      errorMessage,
      handleChange,
      handleBlur,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
      type: "checkbox",
      checkedValue: true,
    })

    function onInput(event) {
      context.emit('update:modelValue', event.target.value)
      handleChange(event)
    }

    const field = reactive({
      focused: true,
    })

    function onFocus() {
      field.focused = !field.focused
      if (!field.focused) {
        handleBlur()
      }
    }

    function classList() {
      const {errorMessage, inputValue} = this
      return {
        valid: meta.valid,
        invalid: !!errorMessage,
        focused: !!(field.focused || inputValue.length),
      }
    }

    return {
      onFocus,
      classList,
      onInput,

      handleChange,
      errorMessage,
      inputValue,
      field,
      meta,
    };
  },
  components: {
    ErrorMessageTooltip,
    CustomCheckbox,
    ContextMessage,
    AlertMessage,
    TogglePassword,
    SuccessMessage,
    InputVisual,
    FieldLabel,
    ErrorMessage,
    PasswordMeter
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
    value: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
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
    errorsTooltip: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
