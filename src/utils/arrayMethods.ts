

export const findObjects =
    (array: object[], find: string | number): object[] => {
    return array.reduce((results: object[], element: object) => {
        const wasFound = delve(Object.values(element), find)

        return wasFound ? [...results, element] : results
    }, [])
}

export const delve = (array: any[], find: string | number | []): boolean => {
    return array.some(value => {
        if (Array.isArray(value)) {
            return delve(value, find)
        } else if (typeof value === 'object') {
            return delve(Object.values(value), find)
        } else {
            return value === find;
        }
    })
}

module.exports = { findObjects, delve }