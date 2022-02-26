

export const search = (array: any[], find: any) => {
    return array.reduce((results, element: any) => {

        if (Array.isArray(element)) {
            results = [...results, search(element, find)]
        }

        return []
    }, [])
}