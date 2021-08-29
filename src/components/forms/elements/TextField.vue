<template>
  <fieldset class="field-wrapper" :class="{'has-tooltip': tooltipHelperText}">
    <ContextMessage :message="contextMessage" :meta="meta"/>
    <AlertMessage :message="alertMessage" :meta="meta"/>
    <div class="control" :class="classList()">
      <div class="field-self">
        <Field @input="onInput"
               @focus="onFocus"
               @blur="onFocus"
               v-bind="$attrs"
               :type="state.type"
               :id="`${name}-${uid}`"
               :name="name"
               :placeholder="state.focused ? '' : placeholder"
               ref="input"
               class="input"
               tabindex="1"/>
        <div v-if="tooltipHelperText" class="input-icon-parent">
          <Tooltip :text="tooltipHelperText">
            <img :src="infoBalloon" class="input-icon" :alt="tooltipHelperText"/>
          </Tooltip>
        </div>
      </div>
      <FieldLabel :label="label" :for="`${name}-${uid}`" :id="`label-${name}-${uid}`"/>
      <InputVisual :class-list="classList()"/>
      <PasswordAdditions v-if="type === 'password'" @togglePassword="togglePassword" :name="name" :value="inputValue"/>
      <SuccessMessage :message="successMessage" :meta="meta"/>
      <ErrorMessage v-if="errorMessage" :name="name" class="field-error-message"/>
      <ErrorTooltip v-else :focused="state.focused" :message="errorMessage"/>
    </div>
  </fieldset>
</template>

<script>
import {reactive, ref} from "vue";
import {useField, Field, ErrorMessage} from "vee-validate";
import {generateUniqueID, infoBalloon} from "@/mixins";
import FieldLabel from "@/components/forms/elements/FieldLabel.vue";
import InputVisual from "@/components/forms/elements/helpers/InputVisual.vue";
import ErrorTooltip from "@/components/forms/elements/messages/ErrorTooltip.vue";
import SuccessMessage from "@/components/forms/elements/messages/SuccessMessage.vue";
import TogglePassword from "@/components/forms/elements/helpers/TogglePassword.vue";
import AlertMessage from "@/components/forms/elements/messages/AlertMessage.vue";
import ContextMessage from "@/components/forms/elements/messages/ContextMessage.vue";
import PasswordStrengthMeter from "@/components/forms/elements/helpers/PasswordStrengthMeter.vue";
import PasswordAdditions from "@/components/forms/elements/helpers/PasswordAdditions.vue";
import Tooltip from "@/components/misc/Tooltip.vue";

export default {
  name: 'VFieldset',
  inheritAttrs: false,
  emits: ["update:modelValue", "sync:event"],
  setup(props, context) {
    const uid = generateUniqueID()
    const inputType = ref(props.type)
    const placeholder = ref(props.placeholder)
    const rules = ref(props.rules)
    const isDisabled = !!(context.attrs.disabled)

    const {
      value: inputValue,
      errorMessage,
      handleChange,
      handleBlur,
      meta,
    } = useField(props.name, rules, {
      initialValue: props.value,
    })

    const state = reactive({
      type: inputType,
      value: inputValue,
      focused: false,
      labelAlwaysVisible: false,
    })

    const onInput = (event) => {
      context.emit('update:modelValue', event.target.value)
      handleChange(event)
    }

    const onFocus = (event) => {
      state.focused = !state.focused
      if (!state.focused) {
        handleBlur(event)
      }
    }

    const togglePassword = (event) => {
      state.type = event.value ? 'password' : 'text'
    }

    const classList = () => {
      const {initialValue, ...classes} = meta;
      return {
        invalid: !!(errorMessage.value),
        focused: !!(state.focused),
        active: !!(state.focused || state.value.length || state.labelAlwaysVisible),
        ...classes,
      }
    }

    return {
      uid,
      errorMessage,
      inputValue,
      state,
      meta,
      inputType,
      placeholder,
      isDisabled,
      onFocus,
      classList,
      togglePassword,
      onInput,
      infoBalloon
    };
  },
  components: {
    PasswordAdditions,
    Tooltip,
    Field,
    ErrorMessage,
    PasswordStrengthMeter,
    ContextMessage,
    AlertMessage,
    TogglePassword,
    SuccessMessage,
    InputVisual,
    FieldLabel,
    ErrorTooltip,
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
    tooltipHelperText: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: undefined
    }
  },
};
</script>

