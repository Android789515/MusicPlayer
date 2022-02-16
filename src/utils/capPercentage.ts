const capPercentage = (result: number) => {
    if (result < 0) {
        return 0
    } else if (result > 1) {
        return 1
    }
    return result
}

export default capPercentage