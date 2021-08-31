<template>
  <div class="grid-x counter-machine">
    <div class="cell small-24 medium-12 ">
      <header class="app-state-machine-header">
        <div class="app-state-machine-title">
          <h1>Counter Machine</h1>
        </div>
        <div class="app-state-machine-current">
          <h2>Current State:</h2>
          <span class="current-state-text">
            {{ state.value }}
          </span>
        </div>
      </header>
      <main class="counter-machine-main">
        <div class="counter-machine-display">
          <h1>{{ state.context.count.toFixed(2) }}</h1>
        </div>
        <div class="counter-machine-buttons">
          <div class="input-group">
            <label for="incrementValue" class="side-label">Ophoogwaarde</label>
            <input v-model.number="incrementValue" :disabled="state.matches('inactive')"
                   id="incrementValue" type="number"/>
          </div>
          <div class="button-group ">
            <button @click="send('TOGGLE')">
              {{ counterButtonLabel }}
            </button>
            <button @click="send('DECREMENT')" :disabled="state.matches('inactive')">
              Verlagen
            </button>
            <button @click="send('INCREMENT')" :disabled="state.matches('inactive')">
              Ophogen
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import counterMachine from '@/machines/30-08-2021/counterMachine'
import {useMachine} from "@xstate/vue";
import {interpret} from "xstate";
import {ref, computed, watchEffect} from "vue";

export default {
  name: "CounterMachine",
  setup() {
    const {state, send} = useMachine(counterMachine)
    const fetchService = interpret(counterMachine, {devTools: true})
    const current = ref(counterMachine.initialState)
    const incrementValue = ref(1)

    const counterButtonLabel = computed(() => {
      const current = state.value
      return current.matches('active') ? 'Deactivate' : current.matches('inactive') ? 'Activate' : '😱'
    })

    watchEffect(() => {
      send({type: 'UPDATE_INCREMENT_VALUE', incrementValue: incrementValue.value || 1})
    })

    fetchService.onTransition(state => current.value = state).start();

    return {
      state,
      send,
      current,
      fetchService,
      counterButtonLabel,
      incrementValue
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./src/scss/abstracts";

.grid-x {
  display: flex;
  justify-content: center;
  margin: 0 0 3rem 0;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin: 0 0 2em 0;

  input {
    max-width: 24rem;
    margin: 0 auto;
  }
}

.side-label {
  padding: 12px;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.counter-machine {
  display: flex;
  flex-direction: column;
  align-items: center;

  .counter-machine-buttons {
    display: flex;
    flex-direction: column;
  }

  .counter-machine-display {
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      font-size: 4em;
      margin: 0;
    }

    justify-content: center;
  }

  .counter-machine-main {
    display: flex;
    flex-direction: column;
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

  .input-group {
    width: 100%;

    input {
      background: $white;
    }

  }


  .counter-machine-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    .button-group {
      flex-flow: row nowrap;
      display: flex;
    }

    button {
      margin: 0 2em;
    }
  }
}
</style>
