const capDecimal = (decimal: number) => {
    const isDecimalNegative = decimal < 0
    const isDecimalTooLarge = decimal > 1

    if (isDecimalNegative) {
        return 0
    } else if (isDecimalTooLarge) {
        return 1
    }
    return decimal
}

export default capDecimal