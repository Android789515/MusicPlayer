

export const search = (array: any[], find: any) => {
    return array.reduce((results, element: any) => {
        if (element === find) return [...results, element]
        return results
    }, [])
}

module.exports = search