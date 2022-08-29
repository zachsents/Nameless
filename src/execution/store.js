import create from 'zustand'

export const useExecutionStore = create(set => ({
    // running: false,
    logs: [],
    log: message => set(state => ({ logs: [message, ...state.logs] }))
    // startRunning: () => set({ running: true }),
    // stopRunning: () => set({ running: false }),
}))