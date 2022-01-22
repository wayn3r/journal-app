export const expectedTypes = {
    AUTH_TYPES: {
        login: '[AUTH] LOGIN',
        logout: '[AUTH] LOGOUT',
        loading: '[AUTH] START LOADING',
        finished: '[AUTH] STOP LOADING',
    },
    NOTES_TYPES: {
        add: '[NOTES] ADD NEW NOTE',
        active: '[NOTES] SET ACTIVE NOTE',
        load: '[NOTES] LOAD NOTES',
        update: '[NOTES] UPDATE NOTE',
        file: '[NOTES] UPDATE NOTE IMAGE URL',
        delete: '[NOTES] DELETE NOTE',
        clear: '[NOTES] CLEAR NOTES',
    },
    default: { clearStore: '[APP] CLEAR STORE' },
}
