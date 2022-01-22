import types from 'types'

export * from './auth.actions'
export * from './notes.actions'
export const clearStore = () => ({
    type: types.clearStore,
})
