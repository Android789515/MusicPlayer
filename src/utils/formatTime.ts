const makeDoubleDigit = (num: number) => {
    const isSingleDigit = String(num).length === 1
    return isSingleDigit ? '0'+num : num
}

const formatTime = (duration: number) => {
    const seconds = Math.floor(duration) % 60
    const minutes = Math.floor(duration / 60) % 60
    const hours = Math.floor(duration / 3600)

    const formattedHours = makeDoubleDigit(hours)
    const formattedMinutes = makeDoubleDigit(minutes)
    const formattedSeconds = makeDoubleDigit(seconds)

    const formattedTime = `${formattedMinutes}:${formattedSeconds}`

    const anyHours = formattedHours > 0

    return anyHours ? `${formattedHours}:` + formattedTime : formattedTime
}

export { formatTime }