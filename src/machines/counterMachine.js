import {assign, createMachine} from "xstate";
import {inspect} from '@xstate/inspect';

inspect({iframe: false})

const incrementCount = assign({
    count: ctx => ctx.count + ctx.incrementValue
});

const decrementCount = assign({
    count: ctx => ctx.count - 1
});

const updateIncrementValue = assign({
    incrementValue: (_, event) => event.incrementValue
});

const states = {
    active: {
        on: {
            TOGGLE: {
                target: 'inactive',
            },
            INCREMENT: {
                actions: ["incrementCount"]
            },
            DECREMENT: {
                actions: ["decrementCount"]
            },
            UPDATE_INCREMENT_VALUE: {
                actions: ['updateIncrementValue']
            }
        }
    },
    inactive: {
        on: {
            TOGGLE: {
                target: 'active',
            }
        }
    }
}

const context = {
    count: 0,
    incrementValue: 1,
}

const actions = {
    actions: {
        incrementCount,
        decrementCount,
        updateIncrementValue
    }
}

const counterMachine = createMachine(
    {
        id: "counter",
        initial: "active",
        context: {...context},
        states: {...states}
    },
    {...actions}
);

export default counterMachine
