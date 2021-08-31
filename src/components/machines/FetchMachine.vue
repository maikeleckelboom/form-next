<template>
  <div class="grid-x fetch-machine">
    <div class="cell small-24 medium-12">
      <div class="app-state-machine-title">
        <h1>Fetch Machine</h1>
      </div>
      <h1 class="poke-title">Pokémon!</h1>
      <h2 class="poke-slogan">Gotta catch 'em all</h2>
      <div class="state-machine-actions">
        <button @click="send('FETCH')" :disabled="!(state.matches('ready') || state.matches('initial'))"
                :class="{'disabled':!(state.matches('ready') || state.matches('initial'))}" class="btn">
          Random Pokémon
        </button>
        <button @click="send('RETRY')" :disabled="!state.matches('failure')"
                :class="{'disabled':!state.matches('failure')}" class="btn">
          Opnieuw
        </button>
      </div>
      <div v-if="state.matches('loading')" class="app-state-machine-loading">
        <FancyLoader/>
      </div>
      <div v-if="state.matches('ready') || state.matches('success')" class="main-wrapper">
        <header class="state-machine-header">
          <div class="state-heading">
            <p class="poke-title misc">{{ state.context.pokemons.species.name }}</p>
            <img :src="state.context.pokemons.sprites.front_default" class="poke-image" alt=""/>
          </div>
        </header>
        <main class="main-wrapper">
          <div>
            <h3>Type</h3>
            <p>{{ state.context.pokemons.types.map((type) => type.type.name).join(', ').toUpperCase() }}</p>
          </div>
          <div>
            <h3>Abilities</h3>
            <p>
              {{ state.context.pokemons.abilities.map((ability) => ability.ability.name).join(', ').toUpperCase() }}</p>
          </div>
          <div class="stats-wrapper">
            <h3>Stats</h3>
            <div>
              <p v-for="(stat, i) in state.context.pokemons.stats" :key="i" class="text-line">
                <span class="key-stat">{{ stat.stat.name }}</span>
                : <span class="base-stat">{{ stat.base_stat }}</span>
              </p>
            </div>
            <div v-for="(stat, i) in state.context.pokemons.stats" :key="i">
              <p v-if="stat.effort" class="text-line">
                <span class="key-stat">effort</span>
                : <span class="base-stat">{{ stat.effort }}</span>
              </p>
            </div>
            <div>
              <p class="text-line">
                <span class="key-stat">weight</span> :
                <span class="base-stat">{{ state.context.pokemons.weight / 100 }}kg</span>
              </p>
            </div>
            <div>
              <p class="text-line">
                <span class="key-stat">base experience</span> :
                <span class="base-stat">{{ state.context.pokemons.base_experience }}</span>
              </p>
            </div>
          </div>
        </main>
      </div>
      <div v-if="state.matches('failure')" class="error-title">
        <h4>Er is een fout opgetreden. - Waarschijnlijkheid van slagen is 60%.</h4>
        <p>{{ state.context.error.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import fetchMachine from '@/machines/31-08-2021/fetchMachine'
import {useMachine} from "@xstate/vue";
import {interpret} from "xstate";
import {ref} from "vue";
import FancyLoader from "@/components/misc/FancyLoader.vue";

export default {
  name: "FetchMachine",
  components: {FancyLoader},
  setup() {
    const {state, send} = useMachine(fetchMachine)
    const fetchService = interpret(fetchMachine, {devTools: true})
    const current = ref(fetchMachine.initialState)

    fetchService.onTransition(state => current.value = state).start();

    return {
      state,
      send,
      current,
      fetchService,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./src/scss/abstracts";
@import url("https://fonts.googleapis.com/css?family=Bangers&display=swap");

.text-line {
  display: grid;
  grid-template-columns: 220px 78px 68px;
  justify-items: start;
}

.stats-wrapper {
  grid-column: 1/-1;
  justify-content: center;
  display: grid;
}

.main-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  margin: 2rem 0;

  @include set-breakpoint(tablet, down) {
    margin-bottom: 0;
  }
}

.grid-x {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.state-machine-actions {
  max-width: 24rem;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;
}

.fetch-machine {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;

  > .cell {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: #ffffff21;
    filter: blur(2px);
    z-index: 0;
    pointer-events: none;
  }

  > * {
    width: 100%;
  }
}

.poke-title {
  font-family: 'bangers', 'sans-serif';
  font-size: 3em;
  margin-bottom: 0;

  &.misc {
    font-size: 6em;
    font-weight: 500;
  }
}

.error-title {
  margin: 2em 0;
  font-size: 2em;
}

.poke-image {
  width: 22em;
  height: 22em;
  display: flex;
  justify-content: center;
  align-items: center;
  image-rendering: pixelated;
}

.poke-slogan {
  transform: skew(-10deg);
  font-family: 'bangers', 'sans-serif';
  font-size: 2em;
  font-weight: 400;
  color: #105993;
  margin-top: 0.05em;
}
</style>
