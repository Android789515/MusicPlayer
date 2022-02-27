const makeDoubleDigit = (num: number) => {
    const isSingleDigit = String(num).length < 2
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

const getSecondsOfTimeFormat = (timeFormat: string) => {
    const partsOfFormat = timeFormat.split(':')
    // Counts indexes backwards since hours may not be present
    const hours = Number(partsOfFormat.at(-3))
    const minutes = Number(partsOfFormat.at(-2))
    let seconds = Number(partsOfFormat.at(-1)) + (minutes * 60)
    if (hours) {
        seconds += (hours * 120)
    }

    return seconds
}

export { formatTime, getSecondsOfTimeFormat }