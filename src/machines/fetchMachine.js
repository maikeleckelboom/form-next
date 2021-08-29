import {createMachine, assign} from 'xstate';

const data = ({
    restaurants: [
        {
            id: 1,
            name: 'BBQ Unleashed',
            rating: 4.5,
            review: 'Dayum good sauce! Praise the Lord Almighty!',
        },
        {
            id: 2,
            name: 'Apollo Restaurant',
            rating: 5,
            review: 'True quality meets true gluttony! They recommend you buy a soda to offset the price of meats!',
        },
        {
            id: 3,
            name: "Nick's Pizza",
            rating: 3.5,
            review: "Very bready pizza, which means it's filling, but you're going to need a beverage to swallow it down!",
        },
        {
            name: 'Good Burger',
            rating: 1,
            review: 'Home of the good burger, can I take your order?',
            id: 4,
        },
    ],
    fetchRestaurants: async () => {
        await this.sleep(1000);
        if (Math.random() < 0.5) {
            throw new Error('Could not fetch restaurants');
        }
        return this.restaurants;
    },
    sleep: (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
})

const fetchMachine = createMachine({
    id: 'fetch',
    initial: 'initial',
    context: {
        restaurants: undefined,
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
                restaurants: (context, _event) => context.restaurants || [],
                error: (_context, _event) => undefined,
            }),
            invoke: {
                id: 'getRestaurants',
                src: (_context, _event) => data.fetchRestaurants(),
                onDone: {
                    target: 'success',
                    actions: assign({
                        restaurants: (_context, event) => event.data,
                    }),
                },
                onError: {
                    target: 'failure',
                    actions: assign({
                        restaurants: (_context, _event) => undefined,
                        error: (_context, event) => event.data,
                    }),
                },
            },
        },
        success: {
            after: {
                2500: 'ready',
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
