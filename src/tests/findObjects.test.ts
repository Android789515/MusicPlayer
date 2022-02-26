// @ts-ignore
const { findObjects } = require('../utils/arrayMethods')

describe('Find method', () => {
    test('Finds all objects in array with a value: book', () => {
        const testArray = [
            { name: 'Nick', books: ['Summer', 'Long gone'] },
            { book: 'Never ending', author: 'James' },
            { name: 'book', title: 'Summer' },
            {},
            {1: 2}
        ]
        expect(findObjects(testArray, 'book')).toIncludeSameMembers([
            { name: 'book', title: 'Summer' }
        ])
    })

    test('Find all objects in array with a value: Apples', () => {
        const testArray = [
            { name: 'Jordan', age: 26 },
            [{ Category: 'Food', name: 'Soup' }],
            [[6, 5, 'a'], [1, 2], { apples: 'apples', job: 'apples'}],
            { listOfBreads: ['banana', 'wheat', 'oat'] },
            { fruits: ['Apples', 'Pears', 'Oranges'], Vegetables: ['Carrots', 'Cucumbers'] }
        ]
        expect(findObjects(testArray, 'Apples')).toIncludeSameMembers([
            { fruits: ['Apples', 'Pears', 'Oranges'], Vegetables: ['Carrots', 'Cucumbers'] }
        ])
    })
})