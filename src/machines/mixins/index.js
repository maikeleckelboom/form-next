/**
 * XState Statecharts - Parallel Services
 *
 * To get the parent state `onDone` we need to land into a `final` state per service.
 *
 * @param services
 * @returns {{type: string, states}}
 */
export const parallelServices = (services) => {
    return {
        type: 'parallel',
        states: services.reduce((acc, {src, actions}) => {
            return {
                ...acc,
                [src]: {
                    initial: 'run',
                    states: {
                        run: {
                            invoke: {
                                src,
                                onDone: {
                                    actions,
                                    target: 'done'
                                }
                            }
                        },
                        done: {
                            type: 'final'
                        }
                    }
                }
            }
        }, {})
    }
}
