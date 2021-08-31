<template>
  <div class="grid-x authentication-machine">
    <div class="cell small-24 cell medium-12">
      <header class="app-state-machine-header">
        <div class="app-state-machine-title">
          <h1>Sequence Machine</h1>
        </div>
        <div class="app-state-machine-current">
          <h2>Current State:</h2>
          <span class="current-state-text">
            {{ state.value }}
          </span>
        </div>
      </header>
      <div class="app-state-machine-actions">
        <button @click="send('GET_TOKEN')"
                :disabled="!!(!state.matches('initial'))"
                :class="{'disabled': !!(!state.matches('initial'))}"
                class="btn">
          Get Token
        </button>
        <button
            @click="send('GET_SESSION')"
            :disabled="!!(state.matches('tokenFailure')
                       || !state.matches('tokenSuccess'))"
            :class="{'disabled': !!(!state.matches('tokenSuccess'))}"
            class="btn">
          Get Session
        </button>
      </div>
      <div v-if="!!(state.matches('tokenSuccess')
                 || state.matches('gettingSession')
                 || state.matches('sessionSuccess')
                 || state.matches('ready'))">
        <JsonFormatter :data="state.context.token"/>
      </div>
      <div v-if="!!( state.matches('sessionSuccess')
                 || state.matches('ready'))">
        <JsonFormatter :data="state.context.session"/>
      </div>
      <div v-if="!!(state.matches('gettingToken')
                 || state.matches('gettingSession'))"
           class="app-state-machine-loading">
        <FancyLoader/>
      </div>
    </div>
  </div>
</template>

<script>
import {useMachine} from "@xstate/vue";
import {interpret} from "xstate";
import {ref} from "vue";
import sequenceMachine from "@/machines/01-09-2021/sequenceMachine";
import CircularLoader from '@/components/misc/CircularLoader.vue';
import JsonFormatter from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import FancyLoader from "@/components/misc/FancyLoader.vue";

export default {
  name: 'sequenceMachine',
  components: {FancyLoader, CircularLoader, JsonFormatter},
  setup() {
    const {state, send} = useMachine(sequenceMachine)
    const sequenceService = interpret(sequenceMachine, {devTools: true})
    const current = ref(sequenceMachine.initialState)
    const context = sequenceMachine.context
    sequenceService.onTransition(state => current.value = state).start();

    return {
      state,
      send,
      current,
      context,
    }
  },
}
</script>
