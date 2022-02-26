

export const search = (array: any[], find: any): any => {
    return array.reduce((results: [], element: any) => {
        if (Array.isArray(element)) {
            return [...results, ...search(element, find)]
        }

        if (typeof element === 'object') {
            return [
                ...results,
                ...search(Object.values(element), find)
            ]
        }

        if (element === find) {
            return [...results, element]
        }

        return results
    }, [])
}

module.exports = search