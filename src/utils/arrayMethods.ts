

export const searchLibrary =
    (array: any[], find: string | number): object[] => {
    return array.reduce((results: any[], element: any) => {
        const isElementArr = Array.isArray(element)
        if (isElementArr) {

        }
    }, [])
}

type objectValues = string | number | [] | object

export const delve = (array: objectValues[], find: string | number): any => {

}