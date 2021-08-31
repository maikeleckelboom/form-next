import {assign, createMachine} from "xstate";
import axios from 'axios';

const tokenRequest = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const authorization = await axios.post(`http://localhost:8000/token`, {
                email: 'admin@account.com',
                password: 'YootPortaal21',
                headers: {'Content-Type': 'application/json'},
            })
            const {data} = authorization
            resolve(data.data)
        } catch (err) {
            reject(err)
        }
    })
}

const sessionRequest = (authorization) => {
    return new Promise(async (resolve, reject) => {
        try {
            const session = await axios.get(`http://localhost:8000/session`, {
                headers: {
                    Authorization: `Bearer ${authorization.access_token}`,
                    'Content-Type': 'application/json'
                }
            })
            resolve(session.data.data.user)
        } catch (err) {
            reject(err)
        }
    })
}

const sequenceMachine = createMachine({
    id: 'sequence',
    initial: 'initial',
    context: {
        token: undefined,
        sesssion: undefined,
        error: undefined,
    },
    states: {
        initial: {
            on: {
                GET_TOKEN: 'gettingToken',
            },
        },
        gettingToken: {
            entry: assign({
                token: (context, _event) => context.token || {},
                error: (_context, _event) => undefined,
            }),
            invoke: {
                id: 'tokenRequest',
                src: (_context, _event) => tokenRequest(_event.id),
                onDone: {
                    target: 'tokenSuccess',
                    actions: assign({
                        token: (_context, event) => event.data,
                    }),

                },
                onError: {
                    target: 'tokenFailure',
                    actions: assign({
                        token: (_context, _event) => undefined,
                        error: (_context, event) => event.data,
                    }),
                },
            },
        },
        gettingSession: {
            entry: assign({
                session: (context, _event) => context.session || {},
                error: (_context, _event) => undefined,
            }),
            invoke: {
                id: 'sessionRequest',
                src: (_context, _event) => sessionRequest(_context.token),
                onDone: {
                    target: 'sessionSuccess',
                    actions: assign({
                        session: (_context, event) => event.data,
                    }),
                },
                onError: {
                    target: 'sessionFailure',
                    actions: assign({
                        token: (_context, _event) => undefined,
                        session: (_context, event) => event.data,
                    }),
                },
            },
        },
        tokenSuccess: {
            on: {
                GET_SESSION: 'gettingSession',
            },
            after: {
                1000: 'gettingSession',
            },
        },
        tokenFailure: {
            on: {
                GET_TOKEN: 'gettingToken',
            },
        },
        sessionSuccess: {
            on: {
                GET_TOKEN: 'gettingToken',
            },
            after: {
                1000: 'ready'
            },
        },
        sessionFailure: {
            on: {
                GET_SESSION: 'gettingSession',
            },
        },
        ready: {
            on: {
                SYNC_TOKEN: 'gettingToken',
                SYNC_SESSION: 'gettingSession',
            },
        },
        logout: {
            on: {
                // LOGOUT: 'destroy',
            }
        },

    },
});

export default sequenceMachine;
