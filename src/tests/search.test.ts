// @ts-ignore
const search = require('../utils/arrayMethods')

describe('Search method', () => {
    test('Finds every number 1 in an array of [1, 2, 3, 1, 5]', () => {
        expect(search([1, 2, 3, 1, 5], 1)).toIncludeSameMembers([1, 1])
    })

    test('Finds every number 6 in an array of [[1, 2, 5, 6], 6, 1, 3]', () => {
        expect(search([[1, 2, 5, 6], 6, 1, 3], 6)).toIncludeSameMembers([6, 6])
    })

    test(`Find every string of 'Hi, there' in an array of
    [['No', 'Why'], 'Hi, there', ['Hi, there', 'Nice', 'Stop'], 'Last', 'Hi, there']`, () => {
        expect(search([
            ['No', 'Low'],
            'Hi, there',
            ['Hi, there', 'Nice', 'Think'],
            'Last',
            'Hi, there'
        ], 'Hi, there')).toIncludeSameMembers(['Hi, there', 'Hi, there', 'Hi, there'])
    })

    const testArray = [
        1,
        { name: 'Jordan', age: 26 },
        'Apples',
        [{ Category: 'Food', name: 'Soup' }],
        [[6, 5, 'a'], [1, 2], { apples: 'apples', job: 'apples'}],
        { listOfBreads: ['banana', 'wheat', 'oat'] },
        { fruits: ['Apples', 'Pears', 'Oranges'], Vegetables: ['Carrots', 'Cucumbers'] }
    ]
    test(`Find every string of 'Apples' in array
    containing objects; the test array above`, () => {
        expect(search(testArray, 'Apples')).toIncludeSameMembers(['Apples', 'Apples'])
    })
})

