<template>
  <div id="">
    <h2>Finite State Machine</h2>
    <div class="">
      <h5>Current State: </h5>
    </div>
    <div class="counter-machine-display">

    </div>
    <div class="counter-machine-buttons">

    </div>
    <div class="counter-machine-buttons">
      <div class="button-group">
        <button @click="send('TOGGLE')">
          {{ counterButtonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import counterMachine from '@/machines/counterMachine'
import {useMachine} from "@xstate/vue";
import {interpret} from "xstate";
import {ref, computed, watchEffect} from "vue";

export default {
  name: "FetchMachine",
  setup() {
    const {state, send} = useMachine(counterMachine)
    const counterService = interpret(counterMachine, {devTools: true})
    const current = ref(counterMachine.initialState)
    const incrementValue = ref(1)

    const counterButtonLabel = computed(() => {
      const current = state.value
      return current.matches('active') ? 'Deactivate' : current.matches('inactive') ? 'Activate' : '😱'
    })

    watchEffect(() => {
      send({type: 'UPDATE_INCREMENT_VALUE', incrementValue: incrementValue.value || 1})
    })

    counterService.onTransition(state => current.value = state).start();

    return {
      state,
      send,
      current,
      counterService,
      counterButtonLabel,
      incrementValue
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./src/scss/abstracts";


#counter-machine-component {
  display: flex !important;
  width: 100%;
  flex-direction: column;

  label {
    text-align: left;
    font-weight: 600;
    font-size: 1.2em;
    padding-bottom: 0.5em;
    float: left;
  }

  h2 {
    padding: 1em 0;
  }

  > * {
    padding: 2em 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  button {
    padding: 1em 1em;
    border-radius: 1em;
    box-shadow: none;
    border: none;
    background-color: palevioletred;
    color: white;
    font-weight: 600;
    font-size: 1em;
    cursor: pointer;
    transition: ease all 180ms;

    &[disabled] {
      background: lighten(palevioletred, 10%);
      opacity: 0.3;
    }

    &:hover {
      background: lighten(palevioletred, 10%);

    }
  }

  h1 {
    font-size: 7em;
  }

  .input-group {
    width: 100%;
  }

  input {
    width: 100%;
    background: $white;
  }

  .counter-machine-display {
    background: #f5b498;
  }

  .counter-machine-content {
    background: #5084af;
    font-size: 2em;
    margin: 0;
    color: white;
    font-weight: 500;
    display: flex;
    flex-direction: column;

  }

  .counter-machine-buttons {
    background: #5084af;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row nowrap;

    .button-group {
      flex-flow: row nowrap;
      display: flex;
    }

    button {
      margin: 0 2em;
    }

    &.m-primary {
    }

    &.m-secondary {
    }

    &.m-tertiary {
    }

    .button-group {
    }
  }
}
</style>
