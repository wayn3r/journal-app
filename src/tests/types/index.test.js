import { expectedTypes } from 'tests/mocks/mock-types'
import * as types from 'types'
describe('Pruebas a los types de redux', () => {
    test('deberia tener los tipos correctos', () => {
        expect(types).toEqual(expectedTypes)
    })
})
