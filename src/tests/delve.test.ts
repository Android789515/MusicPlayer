// @ts-ignore
const { delve } = require('../utils/arrayMethods')

describe('Delve function', () => {
    test('delves into a collection to find a piece of data, returns true if found/false if not', () => {
        expect(delve([0, { 1: { 2: [5] } }], 5)).toBe(true)
    })
})