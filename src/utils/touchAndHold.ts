const touchAndHold = (node: Node, holdDuration: number) => {
    let timer: NodeJS.Timeout

    const startTimer = () => {
        return new Promise(resolve => {
            timer = setTimeout(resolve, holdDuration)
        }).then(() => {
            node.dispatchEvent(new CustomEvent('touchAndHold'))
            removeTimer()
        })
    }

    const removeTimer = () => {
        clearTimeout(timer)
    }

    node.addEventListener('touchstart', startTimer)

    return {
        update(newDuration: number) {
            holdDuration = newDuration
        },
        destroy() {
            node.removeEventListener('touchstart', startTimer)
        }
    }
}

export default touchAndHold