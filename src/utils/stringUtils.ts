export const capitalize = (string: string) => {
    const firstLetter = string[0].toLocaleUpperCase()
    const restOfString = string.slice(1, string.length)

    return firstLetter + restOfString
}

export const replaceSpacesForPath = (string: string) => {
    const doesStringContainSpaces = string.includes(' ')

    if (doesStringContainSpaces) {
        const stringsBetweenSpaces = string.split(' ')

        return stringsBetweenSpaces.join('-')
    }

    return string
}
