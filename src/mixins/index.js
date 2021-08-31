/**
 * Generates a unique id.
 * @returns {string}
 */
export const generateUniqueID = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

/**
 * Public Icons
 * @type {URL}
 */
export const infoBalloon = new URL('/assets/icons/info.svg', import.meta.url)
export const helpText = new URL('/assets/icons/help.svg', import.meta.url)
export const question = new URL('/assets/icons/question.svg', import.meta.url)

/**
 * Delay
 * @param ms
 * @returns {Promise<unknown>}
 */
export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));


/**
 * Random Integer
 * @param min
 * @param max
 * @returns {*}
 */
export const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Tests if a given string is written in uppercase.
 * @param str
 * @returns {boolean}
 */
export const isUpperCase = (str) => !/[a-z]/.test(str) && /[A-Z]/.test(str)

/**
 * Mocks an API-request
 * @returns {Promise<unknown>}
 */
export const fakeApiRequest = () => {
    return new Promise(resolve => setTimeout(() => resolve(true), 3000))
}

/**
 * Removes mulitiple properties from an object.
 * @param object
 * @param keys
 * @returns {{}}
 */
export const removeProperties = (object, ...keys) => Object.entries(object).reduce((prev, [key, value]) => ({...prev, ...(!keys.includes(key) && {[key]: value})}), {})

/**
 * Focusses the next or previous input-field in order.
 * @param event
 * @param direction
 */
export const focusTouchingInputField = (event, direction = 'next') => {
    const fromElement = event.target
    const elements = document.querySelectorAll('input:not([disabled]):not([readonly])')
    const inputElements = [...elements]
    const currentIndex = inputElements.indexOf(fromElement)
    const isPrev = direction === 'prev'
    const isNext = direction === 'next'
    if (isPrev && currentIndex !== 0) {
        inputElements[currentIndex < inputElements.length - 1 ? currentIndex - 1 : 0].focus()
    } else if (isNext && currentIndex !== inputElements.length - 1) {
        inputElements[currentIndex < inputElements.length - 1 ? currentIndex + 1 : 0].focus()
    } else {
        if (process.env.NODE_ENV !== 'production') {
            console.warn(`Dev Warning: there is no field to go ${isPrev ? 'backwards' : 'forwards'} to.`)
        }
    }
}


/**
 * @param fullName
 * @returns {{middleNames: string, firstName: string, lastName: string, fullName: {length}, classified: string}}
 */
export function parseName(fullName) {
    let firstName = ''
    let middleNames = ''
    let lastName = ''
    let classified = ''
    if (fullName && typeof fullName === 'string' && fullName.length) {
        const wordsArray = fullName.split(' ')
        const wordsNum = countWords(fullName)
        if (wordsNum >= 1) firstName = wordsArray.first()
        if (wordsNum >= 2) lastName = wordsArray[wordsArray.length - 1]
        if (wordsNum >= 3) middleNames = everythingBetween(wordsArray)
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


/**
 *
 * @param text
 * @param searchQuery
 * @returns {*}
 */
export function encapsulateMatches(text, searchQuery) {
    const matchExists = text.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchExists) return text
    const re = new RegExp(searchQuery, 'ig')
    return text.replace(re, matchedText => `<span class="invisible">${matchedText}</span>`)
}


/**
 * @param object
 * @returns {{}}
 */
export function removeUndefinedValues(object) {
    return Object.keys(object).reduce((acc, key) => {
        const _acc = acc;
        if (object[key] !== undefined && object[key]) _acc[key] = object[key];
        return _acc;
    }, {})
}


/**
 * @param string
 * @param newString
 * @returns {*}
 */
export function replaceFirstWhitespace(string, newString) {
    const replaceWith = newString ?? ''
    return string.replace(/ +/g, replaceWith)
}


/**
 * @param string
 * @returns {number}
 */
export function countWhitespaces(string) {
    return string.split(' ').length - 1
}


/**
 * @param str
 * @returns {*}
 */
export function countWords(str) {
    return str.split(' ').filter((n) => n !== '').length;
}


/**
 * @param array
 * @returns {*}
 */
export function stringify(array) {
    return array.reduce((pre, next) => pre + ' ' + next)
}


/**
 * @param array
 * @returns {*}
 */
export function everythingBetween(array) {
    array.splice(0, 1)
    array.splice(array.length - 1, 1)
    return stringify(array)
}
