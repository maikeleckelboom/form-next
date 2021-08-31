import {createMachine, assign} from "xstate";

const startUpload = () => {
    return new Promise((resolve, reject) => {
        resolve(true)
    })
}

const uploadMachine = createMachine({
    context: {
        progress: 0,
    },
    initial: 'idle',
    states: {
        idle: {
            on: {
                START: 'pending',
            },
        },
        pending: {
            on: {
                PROGRESS_UPDATED: {
                    assign: assign({
                        progress: (context, event) => event.progress,
                    }),
                },
                CANCEL: {
                    target: 'idle',
                },
            },
            invoke: {
                src: (context) => (send) => {
                    const uploader = startUpload({
                        onProgressUpdate: (progress) => {
                            send({
                                type: 'PROGRESS_UPDATED',
                                progress,
                            });
                        },
                    });
                    return () => {
                        uploader.cancel();
                    };
                },
            },
        },
        failure: {
            on: {
                RETRY: {
                    target: 'pending',
                },
            },
        },
    },
})

export default uploadMachine
