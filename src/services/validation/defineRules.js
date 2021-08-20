import {configure, defineRule} from "vee-validate";

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
})

const isRequired = 'Dit veld is verplicht.'
const isString = 'Enkel normale karakters zijn toegestaan.'
const isEmail = 'Dit is geen geldig e-mailadres.'
const isConfirmed = 'De wachtwoorden komen niet overeen.'

defineRule("required", (value) => {
    if (!value) {
        return "Dit is een verplicht veld.";
    }

    return true;
});

defineRule("email", (value) => {
    if (!value || !value.length) {
        return true;
    }
    // /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/
    if (!`/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/`.test(value)) {
        return "Dit veld moet een geldig e-mailadres zijn.";
    }
    return true;
});

defineRule("min", (value, [min]) => {
    if (value && value.length < min) {
        return `Dit veld moet minimaal ${min} tekens bevatten`;
    }

    return true;
});

defineRule("confirmed", (value, [other]) => {
    if (value !== other) {
        return `De wachtwoorden komen niet overeen.`;
    }

    return true;
});
