export const capitalize = (string: string) => {
    const firstLetter = string[0].toLocaleUpperCase()
    const restOfString = string.slice(1, string.length)

    return firstLetter + restOfString
}