import create from 'zustand'

export const useExecutionStore = create((set) => ({
    running: false,
    startRunning: () => set({ running: true }),
    stopRunning: () => set({ running: false }),
}))