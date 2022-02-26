// @ts-ignore
const search = require('../utils/arrayMethods')

describe('search method', () => {
    test('finds every number 1 in an array of [1, 2, 3, 1, 5]', () => {
        expect(search([1, 2, 3, 1, 5], 1)).toIncludeSameMembers([1, 1])
    })
})