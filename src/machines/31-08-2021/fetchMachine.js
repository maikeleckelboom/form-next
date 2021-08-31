import {createMachine, assign} from 'xstate';
import {randomInteger, wait} from '@/mixins'


const fetchPokemons = async () => {
    await wait(1000);
    return new Promise((resolve, reject) => {
        if (Math.random() < 0.6) reject('The request has failed.');
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomInteger(1, 150)}?limit=1`)
            .then(response => response.json())
            .then(data => resolve(data))
    })
}

const fetchMachine = createMachine({
    id: 'fetch',
    initial: 'initial',
    context: {
        pokemons: undefined,
        error: undefined,
    },
    states: {
        initial: {
            on: {
                FETCH: 'loading',
            },
        },
        ready: {
            on: {
                FETCH: 'loading',
            },
        },
        loading: {
            entry: assign({
                pokemons: (context, _event) => context.pokemons || [],
                error: (_context, _event) => undefined,
            }),
            invoke: {
                id: 'getPokemons',
                src: (_context, _event) => fetchPokemons(),
                onDone: {
                    target: 'success',
                    actions: assign({
                        pokemons: (_context, event) => event.data,
                    }),
                },
                onError: {
                    target: 'failure',
                    actions: assign({
                        pokemons: (_context, _event) => undefined,
                        error: (_context, event) => event.data,
                    }),
                },
            },
        },
        success: {
            after: {
                1500: 'ready',
            },
        },
        failure: {
            on: {
                RETRY: 'loading',
            },
        },
    },
});

export default fetchMachine;
