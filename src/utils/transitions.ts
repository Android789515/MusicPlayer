type Seconds = number
type Milliseconds = number
interface Options {
    delay: Seconds
    duration: Milliseconds
}
const slide = (node: Node, { delay = 0, duration = 250 }: Options) => {
    return {
        delay,
        duration,
        css: (t: any) => `transform: translateY(${t})`
    }
}

export { slide }